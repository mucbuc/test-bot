#!/usr/bin/env node

const test = require( 'tape' )
  , Session = require( '../app/session' )
  , fs = require( 'fs' )
  , path = require( 'path' )
  , NPM = require( '../app/npm' );

test( 'should fail to authenticate', (t) => {

  const logic = new Session( { owner: 'asfdas', token:'blaablaa:blabla' } );
  
  logic
  .pullRemoteRepo( 'dadffaj' )
  .then( t.fail.bind( t ) )
  .catch( error => {
    t.notEqual( error.indexOf( 'Authentication failed' ), -1 );
    t.end();
  });
});

test( 'should cleanup tmp directory', (t) => {
  const logic = new Session( {owner: 'mucbuc'} );

  logic
  .pullRemoteRepo( 'expector' )
  .then( repo => { 

    repo.cleanup();

    fs.stat( repo.path, (err, stats) => {
      
      t.true( err, 'expected to remove temp directory' );
      t.end();
    });
  })
  .catch( t.fail.bind( t ) ); 
});

test( 'should install tape', (t) => {
  const logic = new Session( {owner: 'mucbuc'} );

  logic
  .pullRemoteRepo( 'expector' )
  .then( repo => {
    NPM
    .install(repo.path)
    .then( () => {
      const pathTmp = path.join( repo.path, 'node_modules', 'tape' );
      fs.stat( pathTmp, (err, stats) => {
        t.true( !err && stats.isDirectory(), "expected directory at " + pathTmp );
        t.end();
      });
    }).catch( t.fail.bind( t ) );
  })
  .catch( t.fail.bind( t ) );


});

test( 'should clone remote repo', (t) => {
 
  const logic = new Session( {owner: 'mucbuc'} );
  
  logic
  .pullRemoteRepo( 'expector' )
  .then( repo => {

    const testjs = path.join( repo.path, 'test', 'test.js' );
    fs.stat( testjs, (err, stats) => {
      t.true( !err && stats.isFile(), "expected file at " + testjs );
      t.end();
    });
  })
  .catch( t.fail.bind( t ) );
});

test( 'should fail to clone repo', (t) => {
  try {
    const config = require( './config.json' )
    const logic = new Session( config );
    
    logic
    .pullRemoteRepo( 'wewfeqioewiurwe' )
    .then( t.fail.bind( t ) )
    .catch( error => {
      t.notEqual( error.indexOf( 'not found' ), -1 );
      t.end();
    });
  }
  catch(err) {
    console.error( 'need token to test repo clone failure');
    t.end();
  }

});

test( 'should reject on npm test failure', (t) => {
  NPM.installAndTest( path.join( __dirname, 'fail' ), true )
  .then( t.fail.bind( t ) )
  .catch( err => {
    t.notEqual( err.indexOf( 'Test failed' ), -1 );
    t.end();
  });
});

test( 'should reject on npm install failure', (t) => {
  NPM.installAndTest( path.join( __dirname, 'fail_install' ), true )
  .then( t.fail.bind( t ) )
  .catch( err => {
    t.notEqual( err.indexOf( 'not in the npm registry' ), -1 );
    t.end();
  });
});
