import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', 'Administrator', 'omsairam');
export default () => {

    let doc = {
        correlationId: `test--couchbase`,
        title: 'Perf test experiment',
        url: 'example.com',
        locale: 'en',
        time: `${new Date(Date.now()).toISOString()}`
    };
    client.insertBulk("test", "_default", "_default", makeId(15), doc);
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
export function teardown() {
    xk6_couchbase.flushRemOnBatch("test", "_default", "_default")
}