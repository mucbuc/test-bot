
const test = require( 'tape' )
  , GIT = require( '../app/git' )
  , SessionFactory = require( '../app/session' )
  , path = require( 'path' )
  , fs = require( 'fs' );

class SessionFactoryTestValid {
  static createSession() {
    return SessionFactory.createSession( {owner: 'mucbuc'} ); 
  }
};

class SessionFactoryTestInvalid {
  static createSession() {
    return SessionFactory.createSession( { owner: 'asfdas', token:'blaablaa:blabla' } ); 
  }
};

test( 'should fail to checkout', (t) => {

  GIT
  .pullRepo( path.join( __dirname, '../' ), 'nonsense' )
  .then( t.fail.bind( t ) )
  .catch( error => {
    t.notEqual( error.indexOf( "did not match any file" ) );
    t.end();
  });
});

test( 'should clone local repo', (t) => {

  GIT
  .pullRepo( path.join( __dirname, '../' ) )
  .then( repo => {

    const testjs = path.join( repo.path, 'test', 'git.js' );
    fs.stat( testjs, (err, stats) => {
      
      if (err) 
      {
        console.log( err );
      }

      t.true( !err && stats.isFile(), "expected file at " + testjs );
      t.end();
    });
  })
  .catch( t.fail.bind( t ) );
});

test( 'should fail to authenticate', (t) => {

  const session = SessionFactoryTestInvalid.createSession();
  
  GIT
  .pullRepo( session.makeURLForRemote( 'dadffaj' ) )
  .then( t.fail.bind( t ) )
  .catch( error => {
    t.notEqual( error.indexOf( 'Authentication failed' ), -1 );
    t.end();
  });
});

test( 'should cleanup tmp directory', (t) => {
  const session = SessionFactoryTestValid.createSession();

  GIT
  .pullRepo( session.makeURLForRemote( 'expector' ) )
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
 
  const session = SessionFactoryTestValid.createSession();
  
  GIT
  .pullRepo( session.makeURLForRemote( 'expector' ) )
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
    const session = SessionFactory.createSession( require( './config.json' ) )
      , bogusURL = 'wewfeqioewiurwe'; 
    
    GIT
    .pullRepo( session.makeURLForRemote( bogusURL ) )
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


