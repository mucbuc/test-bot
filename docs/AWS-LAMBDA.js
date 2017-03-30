/*
Example of aws-lambda kicking off tests triggered by github commits. Amazon SNS
	is used for integration with github
*/ 

'use strict';

const http = require( 'http' )
  , ip = process.env.BOT_IP;

exports.handler = (event, context, callback) => {

  try {
    const msg = JSON.parse(event.Records[0].Sns.Message);
    runTests( msg.repository.name, msg.ref, msg.after );
  }
  catch( error ) {
    callback( null, 'failed:' + error );
  }

  function runTests( repo, ref, sha ) {
    const url = 'http://' + ip + '/' + repo + '/' + ref + '/' + sha;
    http.get( url, (result) => {
      callback( null, 'success:' + result.statusMessage );         
    })
    .on( 'error', (err) => {
      callback( null, 'failed:' + err );
    });
  }

};
