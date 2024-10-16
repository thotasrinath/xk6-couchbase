package xk6_couchbase

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/couchbase/gocb/v2"
	k6modules "go.k6.io/k6/js/modules"
)

func init() {
	k6modules.Register("k6/x/couchbase", new(CouchBase))
}

const (
	// TODO: Define these as API constructs. Const/env variables to have backward compatibility.
	doConnectionPerVUEnvKey = "XK6_COUCHBASE_DO_CONN_PER_VU"
	bucketReadinessTimeout  = "XK6_COUCHBASE_BUCKET_READINESS_TIMEOUT"
)

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

func instantiateNewConnection(connectionString string, username string, password string) (*gocb.Cluster, error) {
	// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
	return gocb.Connect("couchbase://"+connectionString, gocb.ClusterOptions{
		Authenticator: gocb.PasswordAuthenticator{
			Username: username,
			Password: password,
		},
	})
}

func getCouchbaseInstance(connectionString string, username string, password string) (*Client, error) {
	doConnPerVu := getenvBoolValue(doConnectionPerVUEnvKey, false)
	if doConnPerVu {
		cluster, err := instantiateNewConnection(connectionString, username, password)
		if err != nil {
			return nil, fmt.Errorf("failed to create new connection for %s. Err: %w", connectionString, err)
		}
		client := &Client{cluster: cluster}
		return client, nil
	}

	once.Do(
		func() {
			cluster, err := instantiateNewConnection(connectionString, username, password)
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
		// Create bucket connections
		c.mu.Lock()
		defer c.mu.Unlock()
		bucket, found := c.bucketsConnections.Load(bucketName)
		if found && bucket != nil {
			return bucket.(*gocb.Bucket), nil
		}

		// TODO: Add retries.
		newBucket := c.cluster.Bucket(bucketName)
		readinessTimeout := getenvDurationValue(bucketReadinessTimeout, 5*time.Second)
		err := newBucket.WaitUntilReady(readinessTimeout, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to wait for bucket %s. Err: %w", bucketName, err)
		}
		c.bucketsConnections.Store(bucketName, newBucket)
		bucket, loaded := c.bucketsConnections.Load(bucketName)
		if !loaded {
			return nil, fmt.Errorf("failed to load bucket %s", bucketName)
		}
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

// TODO: Use gotdotenv or viper pkgs.
func getenvStringValue(key string) (string, error) {
	value := os.Getenv(key)
	if value == "" {
		return value, errors.New("failed to getenv string value")
	}
	return value, nil
}

func getenvDurationValue(key string, defaultValue time.Duration) time.Duration {
	value, err := getenvStringValue(key)
	if err != nil {
		return defaultValue
	}
	duration, err := time.ParseDuration(value)
	if err != nil {
		return defaultValue
	}
	return duration
}

func getenvBoolValue(key string, defaultValue bool) bool {
	s, err := getenvStringValue(key)
	if err != nil {
		return defaultValue
	}
	value, err := strconv.ParseBool(s)
	if err != nil {
		return defaultValue
	}
	return value
}
