import xk6_couchbase from 'k6/x/couchbase';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';

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

export default function () {
    //console.log(data)
    var docId= exec.scenario.iterationInTest;
    var obj = {};
    obj['text_sent_150'] = sentenceGenerator(data,150);
    obj['text_sent_300'] = sentenceGenerator(data,300);
    obj['text_sent_450'] = sentenceGenerator(data,450);
    client.upsert("test", "_default", "_default", docId.toString(), obj);
    // do something with element
}
