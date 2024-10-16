# CouchBase k6 extension

K6 extension to perform tests on couchbase.

## Currently Supported Commands

- Supports inserting a document.
- Supports Batch insertion.
- Supports findOne (Fetch by primary key)
- Supports deleting a document by id
- Supports upserts
- Testing query performance
- Prepared statement query performance

## Build Instructions

- Install xk6 using (go install go.k6.io/xk6/cmd/xk6@latest)
### For Development
```shell
git clone git@github.com:thotasrinath/xk6-couchbase.git
cd xk6-couchbase
xk6 build --output xk6-couchbase --with github.com/thotasrinath/xk6-couchbase=.
```
### For Use
```shell
xk6 build --with github.com/thotasrinath/xk6-couchbase@latest
```

#### Note

By default, a new connection is created per VU.
To share the connection across multiple queries set the environment variable XK6_COUCHBASE_DO_CONN_PER_VU to true
Bucket WaitUntilReady timeout can be set using XK6_COUCHBASE_BUCKET_READINESS_TIMEOUT=20s

## Examples
### Document Insertion Test
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    let doc = {
        correlationId: `test--couchbase`,
        title: 'Perf test experiment',
        url: 'example.com',
        locale: 'en',
        time: `${new Date(Date.now()).toISOString()}`
    };
    client.insert("test", "_default", "_default", makeId(15), doc);
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

```
##### Below is the example commands to test the script
```bash
# Update examples/test-insert.js with cluster credentials and bucket name
 ./xk6-couchbase run --vus 10 --duration 30s examples/test-insert.js
```

### Batch Insert Documents
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');

const batchsize = 50;

export default () => {

    var docobjs = {}

    for (var i = 0; i < batchsize; i++) {
        docobjs[makeId(15)] = getRecord();
    }

    client.insertBatch("test", "_default", "_default", docobjs);
}

function getRecord() {
    return {
        correlationId: `test--couchbase`,
        title: 'Perf test experiment',
        url: 'example.com',
        locale: 'en',
        time: `${new Date(Date.now()).toISOString()}`
    };


}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

```
### FindOne test
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    // syntax :: client.findOne("<db>", "<scope>", "<keyspace>", "<docId>");
    var res = client.findOne("test", "_default", "_default", "002wPJwiJArcUpz");
    console.log(res);
}

```

### Document Deletion Test
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    client.remove("test", "_default", "_default", "002wPJwiJArcUpz", doc);
}

```

### Query test
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    var res = client.find("select * from test._default._default  use keys \"00096zszpZaT47X\"");

    //console.log(res);

}
```

### Query using a prepared statement 
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    var res = client.findByPreparedStmt("select * from test._default._default  use keys \"00096zszpZaT47X\"");

    //console.log(res);

}
```

### Upsert test
#### Initial data load is expected. Data with sequential Id's could be generated with below script. File - examples/load-sequential-data.js

```js
import xk6_couchbase from 'k6/x/couchbase';
const jobConfig = {
    vus: 10,
    count: 10000
}
export const options = {
    scenarios: {
        contacts: {
            executor: 'per-vu-iterations',
            vus: jobConfig.vus,
            iterations: jobConfig.count
        },
    },
};
const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default function () {
    let doc = {
        correlationId: `test--couchbase`,
        title: 'Perf test experiment',
        url: 'example.com',
        locale: 'en',
        time: `${new Date(Date.now()).toISOString()}`
    };

    let docId = ((__VU - 1) * jobConfig.count) + __ITER;
    client.insert("test", "_default", "_default", String(docId), doc);
}
```
#### Upsert test script to generate random id in range and excute Upsert. File - examples/test-upsert.js
```js
import xk6_couchbase from 'k6/x/couchbase';
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    let doc = {
        correlationId: `test--couchbase`,
        title: 'Perf test experiment',
        url: 'example.com',
        locale: 'en',
        time: `${new Date(Date.now()).toISOString()}`,
        randomNo: randomIntBetween(0,1000000)
    };
    client.upsert("test", "_default", "_default", String(randomIntBetween(0, 100000)), doc);
}
```
