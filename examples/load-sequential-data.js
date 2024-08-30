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