import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    // syntax :: client.findOne("<db>", "<scope>", "<keyspace>", "<docId>");
    var res = client.findOne("test", "_default", "_default", "002wPJwiJArcUpz");
    console.log(res);
}
