import xk6_couchbase from 'k6/x/couchbase';


const dbConfig = { hostname: 'localhost', username: '<username>', password: '<password>' };
const bucketsToPreWarm = ['test'];
const client = xk6_couchbase.newClientWithSharedConnection(dbConfig, bucketsToPreWarm, "5s");
export default () => {
    // syntax :: client.findOne("<db>", "<scope>", "<keyspace>", "<docId>");
    var res = client.findOne("test", "_default", "_default", "002wPJwiJArcUpz");
    console.log(res);
}
