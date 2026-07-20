import xk6_couchbase from 'k6/x/couchbase';

const client = xk6_couchbase.newClient(__ENV.CB_HOST || 'localhost', __ENV.CB_USER || '<username>', __ENV.CB_PASS || '<password>');

const BUCKET = __ENV.CB_BUCKET || 'test';
const SCOPE = __ENV.CB_SCOPE || '_default';
const COLLECTION = __ENV.CB_COLLECTION || '_default';
const DOC_ID = 'findone-example';

export default () => {
    // Seed the document first so this example is independently runnable.
    // upsert is idempotent, so repeated runs are safe.
    client.upsert(BUCKET, SCOPE, COLLECTION, DOC_ID, {
        correlationId: 'test--couchbase',
        title: 'Perf test experiment',
    });

    // syntax :: client.findOne("<bucket>", "<scope>", "<collection>", "<docId>");
    const res = client.findOne(BUCKET, SCOPE, COLLECTION, DOC_ID);
    console.log(JSON.stringify(res));
}
