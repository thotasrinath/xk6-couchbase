import xk6_couchbase from 'k6/x/couchbase';

/**
 * Index creation on partyTradeDate
 *
 * CREATE INDEX ix2 ON test (DISTINCT ARRAY (STR_TO_MILLIS(er.meta.partyTradeDate)) FOR er IN trade.party END) USING GSI with {"num_replica": 2};
 */

const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');
export default () => {

    var startDate = randomDate(new Date(2000, 0, 1), new Date(2022, 0, 1), 0, 24);

    var endDate = randomDate(startDate, new Date(2022, 0, 1), 0, 24);


    var query = 'select *\n' +
        'from test t\n' +
        'where any v in t.trade.party satisfies STR_TO_MILLIS(v.meta.partyTradeDate) >= STR_TO_MILLIS($1)\n' +
        '    and STR_TO_MILLIS(v.meta.partyTradeDate) <= STR_TO_MILLIS($2) END limit 10;'

    var res = client.findByPreparedStmt(query, startDate.toISOString(), endDate.toISOString());

    //console.log(res);
}

function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

