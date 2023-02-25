import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {
    var res = client.find("select * from `test._default._default`  use keys \"00096zszpZaT47X\"");

    console.log(res);

}
