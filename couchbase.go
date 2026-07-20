// Package xk6_couchbase implements a k6 extension (k6/x/couchbase) for running
// load tests against Couchbase clusters.
package xk6_couchbase

import (
	"fmt"
	"sync"
	"time"

	"github.com/couchbase/gocb/v2"
	k6modules "go.k6.io/k6/v2/js/modules"
)

func init() {
	k6modules.Register("k6/x/couchbase", New())
}

const (
	defaultBucketReadinessTimeout    = 5 * time.Second
	defaultDoConnectionPerVU         = true
	defaultConnectionBufferSizeBytes = 2048
)

// RootModule is created once per k6 run. It holds state that is shared across
// all VUs, namely the lazily-initialized singleton client used in shared
// connection mode.
type RootModule struct {
	once            sync.Once
	singletonClient *Client
	errz            error
}

// ModuleInstance is created once per VU by k6. Each instance points back to the
// single RootModule so VUs can share the singleton connection when requested.
type ModuleInstance struct {
	vu   k6modules.VU
	root *RootModule
}

// Ensure the module satisfies the k6 module interfaces.
var (
	_ k6modules.Module   = &RootModule{}
	_ k6modules.Instance = &ModuleInstance{}
)

// New builds the root module. It is registered once in init.
func New() *RootModule {
	return &RootModule{}
}

// NewModuleInstance is called by k6 for every VU, handing it the shared root.
func (r *RootModule) NewModuleInstance(vu k6modules.VU) k6modules.Instance {
	return &ModuleInstance{vu: vu, root: r}
}

// Exports exposes the CouchBase API object to the JS runtime as the default
// export, preserving the `import xk6_couchbase from 'k6/x/couchbase'` usage.
func (mi *ModuleInstance) Exports() k6modules.Exports {
	return k6modules.Exports{Default: &CouchBase{root: mi.root}}
}

// CouchBase is the JS-facing API object. Shared state lives on root.
type CouchBase struct {
	root *RootModule
}

type options struct {
	DoConnectionPerVU         bool          `json:"do_connection_per_vu,omitempty"`
	BucketReadinessTimeout    time.Duration `json:"bucket_readiness_timeout,omitempty"`
	BucketsToWarm             []string      `json:"buckets_to_warm,omitempty"`
	ConnectionBufferSizeBytes int           `json:"connection_buffer_size_bytes,omitempty"`
}

// DBConfig holds the connection details for a Couchbase cluster.
type DBConfig struct {
	Hostname string `json:"connection_string,omitempty"`
	Username string `json:"-"`
	Password string `json:"-"`
}

// Client is a connected Couchbase client exposed to JS test scripts. It is
// returned by the NewClient* constructors and caches per-bucket connections.
type Client struct {
	cluster *gocb.Cluster
	options options

	// Key: bucketName (string)
	// Value: *gocb.Bucket
	bucketsConnections sync.Map
	mu                 sync.Mutex
}

// NewClientPerVU returns a client that opens a dedicated cluster connection for
// each VU. Useful for exercising the maximum number of connections a cluster
// can handle.
func (c *CouchBase) NewClientPerVU(dbConfig DBConfig, bucketsToWarm []string, bucketReadinessDuration string, connectionBufferSizeBytes int) (*Client, error) {
	opts := options{
		DoConnectionPerVU:         true,
		BucketReadinessTimeout:    parseStringToDuration(bucketReadinessDuration),
		BucketsToWarm:             bucketsToWarm,
		ConnectionBufferSizeBytes: connectionBufferSizeBytes,
	}
	return c.NewClientWithOptions(dbConfig, opts)
}

// NewClientWithSharedConnection returns a client backed by a single cluster
// connection shared across all VUs, maximizing QPS without exhausting client
// resources.
func (c *CouchBase) NewClientWithSharedConnection(dbConfig DBConfig, bucketsToWarm []string, bucketReadinessDuration string, connectionBufferSizeBytes int) (*Client, error) {
	opts := options{
		DoConnectionPerVU:         false,
		BucketReadinessTimeout:    parseStringToDuration(bucketReadinessDuration),
		BucketsToWarm:             bucketsToWarm,
		ConnectionBufferSizeBytes: connectionBufferSizeBytes,
	}

	return c.NewClientWithOptions(dbConfig, opts)
}

// NewClientWithOptions returns a client configured with the given options,
// optionally pre-warming the requested buckets.
func (c *CouchBase) NewClientWithOptions(dbConfig DBConfig, opts options) (*Client, error) {
	if opts.ConnectionBufferSizeBytes < 1 {
		opts.ConnectionBufferSizeBytes = defaultConnectionBufferSizeBytes
	}
	client, err := c.getCouchbaseInstance(dbConfig, opts)
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

// NewClient returns a client using the default options (shared connection). On
// success it returns the *Client; on failure it returns an error value to the
// JS runtime.
func (c *CouchBase) NewClient(connectionString string, username string, password string) interface{} {
	dbConfig := DBConfig{
		Hostname: connectionString,
		Username: username,
		Password: password,
	}
	opts := options{
		DoConnectionPerVU:      defaultDoConnectionPerVU,
		BucketReadinessTimeout: defaultBucketReadinessTimeout,
	}
	client, err := c.getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		return fmt.Errorf("failed to connect to couchase cluster %s. Err: %w", connectionString, err)
	}
	return client
}

// Insert adds a new document, failing if the document ID already exists.
func (c *Client) Insert(bucketName string, scope string, collection string, docID string, doc any) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for insert. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Insert(docID, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

// Upsert inserts a document, replacing it if the document ID already exists.
func (c *Client) Upsert(bucketName string, scope string, collection string, docID string, doc any) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for upsert. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Upsert(docID, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

// Remove deletes a document by ID using majority durability.
func (c *Client) Remove(bucketName string, scope string, collection string, docID string) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to create bucket connection for remove. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)

	// Remove with Durability
	_, err = col.Remove(docID, &gocb.RemoveOptions{
		Timeout:         100 * time.Millisecond,
		DurabilityLevel: gocb.DurabilityLevelMajority,
	})
	if err != nil {
		return err
	}
	return nil
}

// InsertBatch inserts multiple documents (keyed by document ID) in a single
// bulk operation.
func (c *Client) InsertBatch(bucketName string, scope string, collection string, docs map[string]any) error {
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

// FindMany fetches multiple documents by key in a single bulk operation,
// returning a map of document ID to document. Keys that do not exist (or fail
// to decode) are omitted from the result.
func (c *Client) FindMany(bucketName string, scope string, collection string, keys []string) (map[string]interface{}, error) {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return nil, fmt.Errorf("failed to get bucket connection for findMany. Err: %w", err)
	}
	col := bucket.Scope(scope).Collection(collection)

	batchItems := make([]gocb.BulkOp, len(keys))
	for i, key := range keys {
		batchItems[i] = &gocb.GetOp{ID: key}
	}

	err = col.Do(batchItems, &gocb.BulkOpOptions{Timeout: 3 * time.Second})
	if err != nil {
		return nil, err
	}

	results := make(map[string]interface{}, len(keys))
	for _, op := range batchItems {
		getOp := op.(*gocb.GetOp)
		if getOp.Err != nil {
			continue
		}
		var doc interface{}
		if err := getOp.Result.Content(&doc); err != nil {
			// Skip keys whose content fails to decode.
			continue
		}
		results[getOp.ID] = doc
	}

	return results, nil
}

// Find executes a N1QL query and returns the last row read.
func (c *Client) Find(query string) (any, error) {
	var result interface{}

	queryResult, err := c.cluster.Query(
		query,
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

// Exists reports whether a document with the given ID exists.
func (c *Client) Exists(bucketName string, scope string, collection string, docID string) error {
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to get bucket connection for findOne. Err: %w", err)
	}
	bucketScope := bucket.Scope(scope)
	_, err = bucketScope.Collection(collection).Exists(docID, nil)
	if err != nil {
		return err
	}
	return nil
}

// FindOne fetches a single document by ID.
func (c *Client) FindOne(bucketName string, scope string, collection string, docID string) (any, error) {
	var result interface{}
	bucket, err := c.getBucket(bucketName)
	if err != nil {
		return result, fmt.Errorf("failed to get bucket connection for findOne. Err: %w", err)
	}
	bucketScope := bucket.Scope(scope)
	getResult, err := bucketScope.Collection(collection).Get(docID, nil)
	if err != nil {
		return result, err
	}

	err = getResult.Content(&result)
	if err != nil {
		return result, err
	}

	return result, nil
}

// FindByPreparedStmt executes a N1QL query with positional parameters and
// returns the last row read.
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

// Close closes the underlying cluster connection.
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

func (c *CouchBase) getCouchbaseInstance(dbConfig DBConfig, opts options) (*Client, error) {
	if opts.DoConnectionPerVU {
		return instantiateNewConnection(dbConfig, opts)
	}

	c.root.once.Do(
		func() {
			client, err := instantiateNewConnection(dbConfig, opts)
			if err != nil {
				c.root.errz = err
				return
			}
			c.root.singletonClient = client
		},
	)
	return c.root.singletonClient, c.root.errz
}

func instantiateNewConnection(dbConfig DBConfig, options options) (*Client, error) {
	// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
	connStr := fmt.Sprintf("couchbase://%s?kv_buffer_size=2048", dbConfig.Hostname)
	// connStr := "couchbase://"+dbConfig.Hostname
	cluster, err := gocb.Connect(connStr, gocb.ClusterOptions{
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
