package xk6_couchbase

import (
	"fmt"
	"sync"
)

var lock = &sync.Mutex{}

type CouchClients struct {
	clients []*Client
}

var couchClients *CouchClients

func GetCouchClients() *CouchClients {
	if couchClients == nil {
		lock.Lock()
		defer lock.Unlock()
		if couchClients == nil {
			fmt.Println("Creating CouchClients instance now.")
			couchClients = &CouchClients{}
		} else {
			fmt.Println("CouchClients instance already created.")
		}
	} else {
		fmt.Println("CouchClients instance already created.")
	}

	return couchClients
}
