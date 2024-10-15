package xk6_couchbase

import (
	"fmt"
	"sync"
	"time"

	"github.com/couchbase/gocb/v2"
	k6modules "go.k6.io/k6/js/modules"
)

func init() {
	k6modules.Register("k6/x/couchbase", new(CouchBase))
}

var (
	singletonClient *Client
	errz            error
	once            sync.Once
)

type CouchBase struct{}

type Client struct {
	cluster *gocb.Cluster

	// Key: bucketName (string)
	// Value: *gocb.Bucket
	bucketsConnections sync.Map
	mu                 sync.Mutex
}

func getCouchbaseInstance(connectionString string, username string, password string) (*Client, error) {
	once.Do(
		func() {
			// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
			cluster, err := gocb.Connect("couchbase://"+connectionString, gocb.ClusterOptions{
				Authenticator: gocb.PasswordAuthenticator{
					Username: username,
					Password: password,
				},
			})

			if err != nil {
				errz = err
				return
			}

			singletonClient = &Client{cluster: cluster}
		},
	)
	return singletonClient, errz
}

func (*CouchBase) NewClient(connectionString string, username string, password string) interface{} {
	client, err := getCouchbaseInstance(connectionString, username, password)
	if err != nil {
		return fmt.Errorf("failed to connect to couchase cluster %s. Err: %w", connectionString, errz)
	}
	return client
}

// TODO: Create bucket connections on inits and remove mutex.
func (c *Client) getBucket(bucketName string) (*gocb.Bucket, error) {
	bucket, found := c.bucketsConnections.Load(bucketName)
	if !found || bucket == nil {
		// TODO: Replace printfs with logrus (used in other extensions..)
		// fmt.Printf("bucket %s not found, client instance: %v\n", bucketName, c)
		// Create bucket connections
		c.mu.Lock()
		defer c.mu.Unlock()
		bucket, found := c.bucketsConnections.Load(bucketName)
		if found && bucket != nil {
			return bucket.(*gocb.Bucket), nil
		}

		newBucket := c.cluster.Bucket(bucketName)
		// fmt.Printf("bucket %s connected\n", bucketName)
		err := newBucket.WaitUntilReady(5*time.Second, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to wait for bucket %s. Err: %w", bucketName, err)
		}
		// fmt.Printf("bucket %s ready\n", bucketName)
		c.bucketsConnections.Store(bucketName, newBucket)
		bucket, loaded := c.bucketsConnections.Load(bucketName)
		if !loaded {
			return nil, fmt.Errorf("failed to load bucket %s", bucketName)
		}
		// fmt.Printf("bucket %s loaded %v\n", bucket.(*gocb.Bucket).Name(), loaded)
		return bucket.(*gocb.Bucket), nil
	}
	return bucket.(*gocb.Bucket), nil
}

func (c *Client) Insert(bucketName, scope, collection, docId string, doc any) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for insert. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Insert(docId, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) Upsert(bucketName, scope, collection, docId string, doc any) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for upsert. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Upsert(docId, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) Remove(bucketName, scope, collection, docId string) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for remove. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)

	// Remove with Durability
	_, err = col.Remove(docId, &gocb.RemoveOptions{
		Timeout:         100 * time.Millisecond,
		DurabilityLevel: gocb.DurabilityLevelMajority,
	})
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) InsertBatch(bucketName, scope, collection string, docs map[string]any) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for insertBatch. Err: %w", err)
	}

	batchItems := make([]gocb.BulkOp, len(docs))
	index := 0
	for k, v := range docs {
		batchItems[index] = &gocb.InsertOp{ID: k, Value: v}
		index++
	}
	col := bucket.Scope(scope).Collection(collection)
	err = col.Do(batchItems, &gocb.BulkOpOptions{Timeout: 3 * time.Second})
	if err != nil {
		return err
	}

	return nil
}

func (c *Client) Find(query string) (any, error) {
	var result interface{}

	queryResult, err := c.cluster.Query(
		fmt.Sprintf(query),
		&gocb.QueryOptions{},
	)
	if err != nil {
		return result, err
	}
	// Print each found Row
	for queryResult.Next() {

		err := queryResult.Row(&result)
		if err != nil {
			return result, err
		}
	}

	return result, nil
}

func (c *Client) FindOne(bucketName, scope, collection, docId string) (any, error) {
	var result interface{}
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return result, fmt.Errorf("failed to create bucket connection for findOne. Err: %w", err)
	}
	bucketScope := bucket.Scope(scope)

	getResult, err := bucketScope.Collection(collection).Get(docId, nil)
	if err != nil {
		return result, err
	}

	err = getResult.Content(&result)
	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) FindByPreparedStmt(query string, params ...interface{}) (any, error) {
	var result interface{}
	queryResult, err := c.cluster.Query(
		query,
		&gocb.QueryOptions{
			Adhoc:                true,
			PositionalParameters: params,
		},
	)
	if err != nil {
		return result, err
	}
	// Print each found Row
	for queryResult.Next() {

		err := queryResult.Row(&result)
		if err != nil {
			return result, err
		}
	}

	return result, nil
}
