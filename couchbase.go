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
	defaultBucketReadinessTimeout = 5 * time.Second
	defaultDoConnectionPerVU      = true
)

var (
	singletonClient *Client
	errz            error
	once            sync.Once
)

type CouchBase struct{}

type options struct {
	DoConnectionPerVU      bool          `json:"do_connection_per_vu,omitempty"`
	BucketReadinessTimeout time.Duration `json:"bucket_readiness_timeout,omitempty"`
	BucketsToWarm          []string      `json:"buckets_to_warm,omitempty"`
}

type DBConfig struct {
	Hostname string `json:"connection_string,omitempty"`
	Username string `json:"-"`
	Password string `json:"-"`
}

type Client struct {
	cluster *gocb.Cluster
	options options

	// Key: bucketName (string)
	// Value: *gocb.Bucket
	bucketsConnections sync.Map
	mu                 sync.Mutex
}

func (c *CouchBase) NewClientPerVU(dbConfig DBConfig, bucketsToWarm []string, bucketReadinessDuration string) (*Client, error) {
	opts := options{
		DoConnectionPerVU:      true,
		BucketReadinessTimeout: parseStringToDuration(bucketReadinessDuration),
		BucketsToWarm:          bucketsToWarm,
	}
	return c.NewWithOptions(dbConfig, opts)
}

func (c *CouchBase) NewClientWithSharedConnection(dbConfig DBConfig, bucketsToWarm []string, bucketReadinessDuration string) (*Client, error) {
	opts := options{
		DoConnectionPerVU:      false,
		BucketReadinessTimeout: parseStringToDuration(bucketReadinessDuration),
		BucketsToWarm:          bucketsToWarm,
	}

	return c.NewWithOptions(dbConfig, opts)
}

func (c *CouchBase) NewWithOptions(dbConfig DBConfig, opts options) (*Client, error) {
	client, err := getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		return nil, fmt.Errorf("failed to create new couchbase connection with options for cluster %s. Err: %w", dbConfig.Hostname, err)
	}

	// Optionally warm the bucket on client's request
	for _, bucket := range opts.BucketsToWarm {
		_, err := client.connectBucketOrLoad(bucket)
		if err != nil {
			return nil, fmt.Errorf("failed to connect to bucket :%s, Err: %w", bucket, err)
		}
	}
	return client, nil
}

func (*CouchBase) NewClient(connectionString string, username string, password string) interface{} {
	dbConfig := DBConfig{
		Hostname: connectionString,
		Username: username,
		Password: password,
	}
	opts := options{
		DoConnectionPerVU:      defaultDoConnectionPerVU,
		BucketReadinessTimeout: defaultBucketReadinessTimeout,
	}
	client, err := getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		return fmt.Errorf("failed to connect to couchase cluster %s. Err: %w", connectionString, err)
	}
	return client
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
		return result, fmt.Errorf("failed to get bucket connection for findOne. Err: %w", err)
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

func (c *Client) Close() error {
	opts := gocb.ClusterCloseOptions{}
	return c.cluster.Close(&opts)
}

// TODO: Create bucket connections on inits and remove mutex.
func (c *Client) getBucket(bucketName string) (*gocb.Bucket, error) {
	return c.connectBucketOrLoad(bucketName)
}

func (c *Client) connectBucketOrLoad(bucketName string) (*gocb.Bucket, error) {
	bucket, found := c.bucketsConnections.Load(bucketName)
	if !found || bucket == nil {
		// Create bucket connections
		// Mutex Lock to ensure that the bucket is instantiated only once in shared cluster connection mode.
		c.mu.Lock()
		defer c.mu.Unlock()
		bucket, found := c.bucketsConnections.Load(bucketName)
		if found && bucket != nil {
			return bucket.(*gocb.Bucket), nil
		}

		newBucket := c.cluster.Bucket(bucketName)
		err := newBucket.WaitUntilReady(c.options.BucketReadinessTimeout, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to wait for bucket %s, timeout: %v. Err: %w", bucketName, c.options.BucketReadinessTimeout, err)
		}
		c.bucketsConnections.Store(bucketName, newBucket)
		return newBucket, nil

	}
	return bucket.(*gocb.Bucket), nil
}

func getCouchbaseInstance(dbConfig DBConfig, opts options) (*Client, error) {
	if opts.DoConnectionPerVU {
		return instantiateNewConnection(dbConfig, opts)
	}

	once.Do(
		func() {
			client, err := instantiateNewConnection(dbConfig, opts)
			if err != nil {
				errz = err
				return
			}
			singletonClient = client
		},
	)
	return singletonClient, errz
}

func instantiateNewConnection(dbConfig DBConfig, options options) (*Client, error) {
	// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
	cluster, err := gocb.Connect("couchbase://"+dbConfig.Hostname, gocb.ClusterOptions{
		Authenticator: gocb.PasswordAuthenticator{
			Username: dbConfig.Username,
			Password: dbConfig.Password,
		},
		// TODO: Set timeoutConfig
	})
	if err != nil {
		return nil, fmt.Errorf("faile to instantiate new connection to couchbase cluster %s. Err: %w", dbConfig.Hostname, err)
	}

	return &Client{cluster: cluster, options: options}, nil
}

func parseStringToDuration(bucketReadinessDuration string) time.Duration {
	readinessDuration, err := time.ParseDuration(bucketReadinessDuration)
	if err != nil {
		readinessDuration = defaultBucketReadinessTimeout
	}

	return readinessDuration
}
