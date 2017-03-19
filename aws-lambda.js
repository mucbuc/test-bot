'use strict';

const http = require( 'http' )
  , ip = '12.16.128.15';

exports.handler = (event, context, callback) => {

    const msg = JSON.parse(event.Records[0].Sns.Message)
      , url = 'http://' + ip + '/' + msg.repository.name + '/' + msg.after;
    
    http.get( url, (result) => {
        callback( null, 'success:' + result.statusMessage );         
    })
    .on( 'error', (err) => {
        callback( null, 'failed:' + err );
    });
};