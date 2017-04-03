#!/usr/bin/env node

'use strict';

const cp = require( 'child_process' )
  , path = require( 'path' )
  , http = require( 'http' )
  , test = require( 'tape' );

function launchServer() {
  let server = cp.fork( 
    getRelativePath('../app/index'), 
    [ getRelativePath( './smoke.json' ) ] 
  );

  process.on( 'exit', () => {
    server.kill();
  });

  return server;
}

let server = launchServer();

test( 'success route without token', (t) => {

  setTimeout( () => {
    const url = 'http://localhost:3000/pass/refs/heads/master/199ef929c24965a176126aed951110ec85dec3b6';
    http.get( url, (result) => {
      result.on( 'data', (chunk) => {
        const response = JSON.parse(chunk.toString());
        
        t.true( response.hasOwnProperty( 'state' ) );
        t.equal( response.state, 'success' );
        t.end();
        server.kill();
      });
    })
    .on( 'error', (err) => {
      server.kill();
    });
  }, 1000 );
});


function getRelativePath(filePath) {
  return path.join( __dirname, filePath );
}