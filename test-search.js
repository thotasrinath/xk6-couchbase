import xk6_couchbase from 'k6/x/couchbase';
import { SharedArray } from 'k6/data';


const client = xk6_couchbase.newClient('localhost', 'Administrator', 'omsairam');

const data = new SharedArray('words', function () {
    // All heavy work (opening and processing big files for example) should be done inside here.
    // This way it will happen only once and the result will be shared between all VUs, saving time and memory.
    const f = JSON.parse(open('./words_dictionary.json'));
    return Object.keys(f); // f must be an array
});

function sentenceGenerator(words, size) {
    var sentence = '';
    for (var i=0;i<size;i++){
        sentence += words[Math.floor(Math.random()*words.length)] + ' ';
    }

    return sentence;
}

export default () => {

    var res = client.search("test", sentenceGenerator(data,5), ["text_sent_150"], 10);

    console.log(res);

}
