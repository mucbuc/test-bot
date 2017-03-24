#!/usr/bin/env node

"use strict";

const assert = require( 'assert' )
  , http = require( 'http' )
  , url = require( 'url' )
  , path = require( 'path' )
  , fs = require( 'fs' )
  , Session = require( './session' )
  , program = require( 'commander' )
  , GIT = require( './git' )
  , NPM = require( './npm' );

program
.version('0.0.1')
.usage( '<file>' )
.parse( process.argv );

if (!program.args.length)
{
  console.error( "error: no configuration file specified" );
  return;
}

fs.readFile( program.args[0], (err, data) => {

  if (err) {
    console.error( 'error loading config file: ', err );
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
      , ref = pathParams.slice(1, -1).join( '/' )
      , sha = pathParams[pathParams.length - 1];

    session.createStatus( repoName, sha, 'pending' );

    GIT.pullRepo( session.makeURLForRemote( repoName ), ref, sha )
    .then( repo => {

      NPM
      .installAndTest(repo.path)
      .then( () => {
        const state = 'success';
        session.createStatus( repoName, sha, state );

        res.writeHead( 200 );
        res.end( JSON.stringify( { state: state } ) );
      
        repo.cleanup();
      } )
      .catch( err => {
        console.error( err );
        
        const state = 'failure';
        session.createStatus( repoName, sha, state );

        result[error] = err;
        res.writeHead( 500 );
        res.end( JSON.stringify( { state: state } ) );

        repo.cleanup();
      });
    })
    .catch( err => {
      console.error( err );
      
      res.writeHead( 404 ); 
      res.end( { error: err } );
    });

  })
  .listen( port, () => {
    console.log( 'test-bot listening on port', port );
  });
}
