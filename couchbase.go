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

const (
	// TODO: Define these as API constructs. Const/env variables to have backward compatibility.
	// doConnectionPerVUEnvKey = "XK6_COUCHBASE_DO_CONN_PER_VU"
	// bucketReadinessTimeout  = "XK6_COUCHBASE_BUCKET_READINESS_TIMEOUT"
	defaultBucketReadinessTimeout = 5 * time.Second
	defaultDoConnectionPerVU      = false
)

var (
	singletonClient *Client
	once            sync.Once
)

type CouchBase struct{}

type Options struct {
	doConnectionPerVU      bool
	bucketReadinessTimeout time.Duration
	bucketsToWarm          []string
}

func newDefaultOptions() Options {
	return Options{
		doConnectionPerVU:      defaultDoConnectionPerVU,
		bucketReadinessTimeout: defaultBucketReadinessTimeout,
	}
}

type DBConfig struct {
	Hostname string `json:"connection_string,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

type Client struct {
	cluster *gocb.Cluster
	errz    error
	options Options

	// Key: bucketName (string)
	// Value: *gocb.Bucket
	bucketsConnections sync.Map
	mu                 sync.Mutex
}

func instantiateNewConnection(dbConfig DBConfig, options Options) *Client {
	// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
	cluster, err := gocb.Connect("couchbase://"+dbConfig.Hostname, gocb.ClusterOptions{
		Authenticator: gocb.PasswordAuthenticator{
			Username: dbConfig.Username,
			Password: dbConfig.Password,
		},
		TimeoutsConfig: gocb.TimeoutsConfig{
			ConnectTimeout: 95 * time.Second,
			QueryTimeout:   95 * time.Second,
			SearchTimeout:  95 * time.Second,
		},
	})
	if err != nil {
		return &Client{errz: err, options: options}
	}

	client := &Client{cluster: cluster, options: options}
	for _, bucket := range options.bucketsToWarm {
		err := client.readyBucket(bucket)
		if err != nil {
			return &Client{errz: err, options: options}
		}
	}
	return client
}

func getCouchbaseInstance(dbConfig DBConfig, options Options) *Client {
	if options.doConnectionPerVU {
		return instantiateNewConnection(dbConfig, options)
	}

	once.Do(
		func() {
			singletonClient = instantiateNewConnection(dbConfig, options)
		},
	)
	return singletonClient
}

func (*CouchBase) NewOptions(doConnectionPerVU bool, bucketReadinessTimeout string, bucketsToWarm []string) interface{} {

	readinessDuration, err := time.ParseDuration(bucketReadinessTimeout)
	if err != nil {
		return fmt.Errorf("failed to parse readiness timeout %v. Err: %w", bucketReadinessTimeout, err)
	}
	return Options{
		doConnectionPerVU:      doConnectionPerVU,
		bucketReadinessTimeout: readinessDuration,
		bucketsToWarm:          bucketsToWarm,
	}
}

func (*CouchBase) NewWithOptions(dbConfig DBConfig, options Options) *Client {
	return getCouchbaseInstance(dbConfig, options)
}

func (*CouchBase) NewClient(connectionString string, username string, password string) interface{} {
	dbConfig := DBConfig{
		Hostname: connectionString,
		Username: username,
		Password: password,
	}
	client := getCouchbaseInstance(dbConfig, newDefaultOptions())
	if client.errz != nil {
		return fmt.Errorf("failed to connect to couchase cluster %s. Err: %w", connectionString, client.errz)
	}
	return client
}

func (c *Client) readyBucket(bucketName string) error {
	bucket, found := c.bucketsConnections.Load(bucketName)
	if !found || bucket == nil {
		// Create bucket connections
		c.mu.Lock()
		defer c.mu.Unlock()
		bucket, found := c.bucketsConnections.Load(bucketName)
		if found && bucket != nil {
			return nil
		}

		// TODO: Add retries.
		newBucket := c.cluster.Bucket(bucketName)
		err := newBucket.WaitUntilReady(c.options.bucketReadinessTimeout, nil)
		if err != nil {
			return fmt.Errorf("failed to wait for bucket %s, timeout: %v. Err: %w", bucketName, c.options.bucketReadinessTimeout, err)
		}
		c.bucketsConnections.Store(bucketName, newBucket)
	}
	return nil
}

// TODO: Create bucket connections on inits and remove mutex.
func (c *Client) getBucket(bucketName string) (*gocb.Bucket, error) {
	err := c.readyBucket(bucketName)
	if err != nil {
		return nil, fmt.Errorf("failed to ready bucket %s, Err: %w", bucketName, err)
	}
	bucket, loaded := c.bucketsConnections.Load(bucketName)
	if !loaded {
		return nil, fmt.Errorf("failed to load bucket %s", bucketName)
	}
	return bucket.(*gocb.Bucket), nil

	// bucket, found := c.bucketsConnections.Load(bucketName)
	// if !found || bucket == nil {
	// 	// Create bucket connections
	// 	c.mu.Lock()
	// 	defer c.mu.Unlock()
	// 	bucket, found := c.bucketsConnections.Load(bucketName)
	// 	if found && bucket != nil {
	// 		return bucket.(*gocb.Bucket), nil
	// 	}

	// 	// TODO: Add retries.
	// 	newBucket := c.cluster.Bucket(bucketName)
	// 	err := newBucket.WaitUntilReady(c.options.bucketReadinessTimeout, nil)
	// 	if err != nil {
	// 		return nil, fmt.Errorf("failed to wait for bucket %s, timeout: %v. Err: %w", bucketName, c.options.bucketReadinessTimeout, err)
	// 	}
	// 	c.bucketsConnections.Store(bucketName, newBucket)
	// 	bucket, loaded := c.bucketsConnections.Load(bucketName)
	// 	if !loaded {
	// 		return nil, fmt.Errorf("failed to load bucket %s", bucketName)
	// 	}
	// 	return bucket.(*gocb.Bucket), nil
	// }
	// return bucket.(*gocb.Bucket), nil
}

func (c *Client) HasError() bool {
	return c.errz != nil
}

func (c *Client) GetError() string {
	return c.errz.Error()
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
