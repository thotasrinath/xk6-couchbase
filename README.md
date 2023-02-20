# CouchBase k6 extension

K6 extension to perform tests on couchbase.

## Currently Supported Commands

- Supports inserting a document.
- Supports Batch insertion.
- Support findOne (Fetch by primary key)
- Support checking query performance

## Examples: 
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
    client.findOne("test", "_default", "_default", "002wPJwiJArcUpz");
}

```

### Query test
```js
import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    client.find("test", "_default", "select * from `_default` use keys \"00096zszpZaT47X\"");

}


```