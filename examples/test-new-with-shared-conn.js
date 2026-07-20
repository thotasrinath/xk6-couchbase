import xk6_couchbase from 'k6/x/couchbase';

const BUCKET = __ENV.CB_BUCKET || 'test';
const SCOPE = __ENV.CB_SCOPE || '_default';
const COLLECTION = __ENV.CB_COLLECTION || '_default';
const DOC_ID = 'shared-conn-example';

// newClientWithSharedConnection shares a single cluster connection across all
// VUs, maximizing QPS without exhausting client resources.
const dbConfig = { hostname: __ENV.CB_HOST || 'localhost', username: __ENV.CB_USER || '<username>', password: __ENV.CB_PASS || '<password>' };
const bucketsToPreWarm = [BUCKET];
const client = xk6_couchbase.newClientWithSharedConnection(dbConfig, bucketsToPreWarm, "5s");

export default () => {
    // Seed the document first so this example is independently runnable.
    client.upsert(BUCKET, SCOPE, COLLECTION, DOC_ID, {
        correlationId: 'test--couchbase',
        title: 'Perf test experiment',
    });

    // syntax :: client.findOne("<bucket>", "<scope>", "<collection>", "<docId>");
    const res = client.findOne(BUCKET, SCOPE, COLLECTION, DOC_ID);
    console.log(JSON.stringify(res));
}
