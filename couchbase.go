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

	return &Client{client: cluster}

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
