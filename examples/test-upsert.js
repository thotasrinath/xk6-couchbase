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

