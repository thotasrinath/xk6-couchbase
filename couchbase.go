package xk6_couchbase

import (
	"fmt"
	"github.com/couchbase/gocb/v2"
	k6modules "go.k6.io/k6/js/modules"
	"log"
	"time"
)

func init() {
	k6modules.Register("k6/x/couchbase", new(CouchBase))
}

type CouchBase struct{}

type Client struct {
	client *gocb.Cluster
	items  []gocb.BulkOp
	count  int
	batch  int
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
		log.Fatal(err)
		return err
	}

	client := &Client{client: cluster, batch: 50}

	cClients := GetCouchClients()
	cClients.clients = append(cClients.clients, client)

	return client

}

func (c *Client) Insert(bucketName, scope, collection, docId string, doc any) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	col := bucket.Scope(scope).Collection(collection)
	_, err = col.Insert(docId, doc, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

func (c *Client) InsertBulk(bucketName, scope, collection, docId string, doc any) error {

	if len(c.items) <= c.count {
		c.items = append(c.items, &gocb.InsertOp{ID: docId, Value: doc})
	} else {
		c.items[c.count] = &gocb.InsertOp{ID: docId, Value: doc}
	}

	c.count++

	if c.count%c.batch == 0 {
		bucket := c.client.Bucket(bucketName)
		err := bucket.WaitUntilReady(5*time.Second, nil)
		if err != nil {
			log.Fatal(err)
			return err
		}
		col := bucket.Scope(scope).Collection(collection)
		err = col.Do(c.items, &gocb.BulkOpOptions{Timeout: 5 * time.Second})
		if err != nil {
			log.Fatal(err)
			return err
		}

		c.count = 0
	}

	return nil
}

func (c *Client) InsertBatch(bucketName, scope, collection string, docs map[string]any) error {

	var batchItems []gocb.BulkOp

	for k, v := range docs {
		batchItems = append(batchItems, &gocb.InsertOp{ID: k, Value: v})
	}

	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	col := bucket.Scope(scope).Collection(collection)
	err = col.Do(batchItems, &gocb.BulkOpOptions{Timeout: time.Minute})
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func (*CouchBase) FlushRemOnBatch(bucketName, scope, collection string) error {
	clients := GetCouchClients().clients

	for _, c := range clients {
		if c.count > 0 {
			items := c.items[0:c.count]
			bucket := c.client.Bucket(bucketName)
			err := bucket.WaitUntilReady(5*time.Second, nil)
			if err != nil {
				log.Fatal(err)
				return err
			}
			col := bucket.Scope(scope).Collection(collection)
			err = col.Do(items, &gocb.BulkOpOptions{})
			if err != nil {
				log.Fatal(err)
				return err
			}

			c.count = 0
			//c.client.Close(&gocb.ClusterCloseOptions{})
		}

	}

	return nil
}

func (c *Client) SetBatchCount(batch int) {
	log.Println("Batch count is set to", batch)
	c.batch = batch

}

func (c *Client) Find(bucketName, scope, query string) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	bucketScope := bucket.Scope(scope)

	queryResult, err := bucketScope.Query(
		fmt.Sprintf(query),
		&gocb.QueryOptions{},
	)
	if err != nil {
		log.Fatal(err)
		return err
	}
	// Print each found Row
	for queryResult.Next() {
		var result interface{}
		err := queryResult.Row(&result)
		if err != nil {
			log.Fatal(err)
			return err
		}
		log.Println(result)
	}

	return nil
}

func (c *Client) FindOne(bucketName, scope, collection, docId string) error {
	bucket := c.client.Bucket(bucketName)
	err := bucket.WaitUntilReady(5*time.Second, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	bucketScope := bucket.Scope(scope)

	getResult, err := bucketScope.Collection(collection).Get(docId, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}

	var result interface{}
	err = getResult.Content(&result)
	if err != nil {
		log.Fatal(err)
		return err
	}
	log.Println("Printing", result)

	return nil
}
