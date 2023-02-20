package xk6_couchbase

import (
	"log"
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
			log.Println("Creating CouchClients instance now.")
			couchClients = &CouchClients{}
		}
	}

	return couchClients
}
