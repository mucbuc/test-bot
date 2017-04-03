#!/usr/bin/env node

'use strict';

const cp = require( 'child_process' )
  , path = require( 'path' )
  , http = require( 'http' )
  , test = require( 'tape' );

function launchServer() {
  let server = cp.fork( 
    getRelativePath('../app/index'), 
    [ getRelativePath( './config.json' ) ] 
  );

  process.on( 'exit', () => {
    server.kill();
  });
}

launchServer();

test( 'success route', (t) => {

  setTimeout( () => {

    http.get( 'http://localhost:3000/expector/refs/heads/master/04645fa635f23cb484f75e182f5430edb6d0cd16', (result) => {
      result.on( 'data', (chunk) => {
        const response = JSON.parse(chunk.toString());
        
        t.true( response.hasOwnProperty( 'state' ) );
        t.equal( response.state, 'success' );
        t.end();
        process.exit( 0 );
      });
    })
    .on( 'error', (err) => {
      process.exit( 1 );
    });
  }, 1000 );
});


function getRelativePath(filePath) {
  return path.join( __dirname, filePath );
}