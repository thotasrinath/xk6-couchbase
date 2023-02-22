import xk6_couchbase from 'k6/x/couchbase';

/**
 * Index creation on tradeDate
 *
 * CREATE INDEX `global_myDateIdx`
 *     ON `test` (STR_TO_MILLIS(`tradeDate`))
 *     USING GSI;
 */

const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    var startDate = randomDate(new Date(2000, 0, 1), new Date(2022, 0, 1), 0, 24);

    var endDate = randomDate(startDate, new Date(2022, 0, 1), 0, 24);


    var query = 'select *\n' +
        'from test._default._default t\n' +
        'where STR_TO_MILLIS(t.tradeDate) >= STR_TO_MILLIS("'+startDate.toISOString()+'")\n' +
        '  and STR_TO_MILLIS(t.tradeDate) <= STR_TO_MILLIS("'+endDate.toISOString()+'")\n' +
        'limit 10;'

    var res = client.find("test", "_default", query);

    //console.log(res);
}

function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

