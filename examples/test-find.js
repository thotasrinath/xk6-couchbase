import xk6_couchbase from 'k6/x/couchbase';

const client = xk6_couchbase.newClient(__ENV.CB_HOST || 'localhost', __ENV.CB_USER || '<username>', __ENV.CB_PASS || '<password>');

const BUCKET = __ENV.CB_BUCKET || 'test';
const SCOPE = __ENV.CB_SCOPE || '_default';
const COLLECTION = __ENV.CB_COLLECTION || '_default';
const DOC_ID = 'find-example';

export default () => {
    // Seed the document first so this example is independently runnable.
    client.upsert(BUCKET, SCOPE, COLLECTION, DOC_ID, {
        correlationId: 'test--couchbase',
        title: 'Perf test experiment',
    });

    // USE KEYS performs a key lookup through the query service and needs no
    // secondary/primary index, so this runs on a fresh bucket.
    const res = client.find(`select * from \`${BUCKET}\`.\`${SCOPE}\`.\`${COLLECTION}\` use keys "${DOC_ID}"`);
    console.log(JSON.stringify(res));
}
