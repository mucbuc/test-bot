#!/usr/bin/env node

"use strict";

const assert = require( 'assert' )
  , http = require( 'http' )
  , url = require( 'url' )
  , path = require( 'path' )
  , fs = require( 'fs' )
  , Session = require( './session' )
  , NPM = require( './npm' )
  , program = require( 'commander' );

program
.version('0.0.1')
.usage( '<file>' )
.parse( process.argv );

if (!program.args.length)
{
  console.log( "error: no configuration file specified" );
  return
}

fs.readFile( program.args[0], (err, data) => {

  if (err) {
    console.log( 'error loading config file: ', err );
    return;
  }

  const config = JSON.parse( data );
  listen( new Session( config ), config.port);
});

function listen( session, port = '3000' ) {

  http.createServer( (req, res) => {

    if (req.url === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }

    const pathParams = url.parse( req.url, true ).pathname.split( '/' ).slice( 1 );

    assert( pathParams.length != 0 );

    const repoName = pathParams[0]
      , ref = pathParams.slice(1).join( '/' )
      , sha = ref.length == 40 ? ref : '';

    session.createStatus( repoName, sha, 'pending' );

    runTest()
    .then( testResult => {
      session.createStatus( repoName, sha, testResult.state );
      res.writeHead( testResult.code );
      delete testResult.code;
      res.end( JSON.stringify(testResult) );
    })
    .catch( err => {
      console.log( err );
      res.writeHead( 500 );
      res.end( JSON.stringify( {error: err} ) );
    });

    function runTest() {
      return new Promise( (resolve, reject) => {
        session.pullRemoteRepo( repoName, ref )
        .then( repo => {
          
          NPM
          .installAndTest(repo.path)
          .then( onTestFinished.bind( null, { state: 'success', code: 200 } ) )
          .catch( err => {
            onTestFinished( { state: 'failure', error: err, code: 201 } );
          });
          
          function onTestFinished( testResult ) {
            repo.cleanup(); 
            resolve( testResult );
          }
        })
        .catch( err => {
          resolve( { error: err, code: 404 } );
        });
      });
    }
  })
  .listen( port, () => {
    console.log( 'test-bot listening on port', port );
  });
}
