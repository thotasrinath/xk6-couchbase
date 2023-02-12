import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    client.find("test", "_default", "select * from `_default` use keys \"00096zszpZaT47X\"");

}
