const test = require( 'tape' )
  , Session = require( '../app/session' )
  , fs = require( 'fs' )
  , path = require( 'path' );

test( 'should fail to authenticate', (t) => {

  const session = new Session( { owner: 'asfdas', token:'blaablaa:blabla' } );
  
  session
  .pullRemoteRepo( 'dadffaj' )
  .then( t.fail.bind( t ) )
  .catch( error => {
    t.notEqual( error.indexOf( 'Authentication failed' ), -1 );
    t.end();
  });
});

test( 'should cleanup tmp directory', (t) => {
  const session = new Session( {owner: 'mucbuc'} );

  session
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


test( 'should clone remote repo', (t) => {
 
  const session = new Session( {owner: 'mucbuc'} );
  
  session
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
    const session = new Session( config );
    
    session
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

