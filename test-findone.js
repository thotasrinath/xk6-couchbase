import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    var data = client.findone("test", "_default", "_default", "00096zszpZaT47X");

    console.log(data)
}
