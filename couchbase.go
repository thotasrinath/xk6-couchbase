package xk6_couchbase

import (
	"fmt"
	"time"

	"github.com/couchbase/gocb/v2"
	k6modules "go.k6.io/k6/js/modules"
)

func init() {
	k6modules.Register("k6/x/couchbase", new(CouchBase))
}

type CouchBase struct{}

type Client struct {
	client *gocb.Cluster
}

func (*CouchBase) NewClient(connectionString, username, password string) interface{} {
	// For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
	cluster, err := gocb.Connect("couchbase://"+connectionString, gocb.ClusterOptions{
		Authenticator: gocb.PasswordAuthenticator{
			Username: username,
			Password: password,
		},
	})
	if err != nil {
		return err
	}

	return &Client{client: cluster}
}

func (c *Client) Insert(bucketName, scope, collection, docId string, doc any) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		return err
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Insert(docId, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) Upsert(bucketName, scope, collection, docId string, doc any) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		return err
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Upsert(docId, doc, nil)
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) Remove(bucketName, scope, collection, docId string) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		return err
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
	batchItems := make([]gocb.BulkOp, len(docs))
	index := 0
	for k, v := range docs {
		batchItems[index] = &gocb.InsertOp{ID: k, Value: v}
		index++
	}

	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		return err
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

	queryResult, err := c.client.Query(
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
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		return result, err
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
	queryResult, err := c.client.Query(
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
