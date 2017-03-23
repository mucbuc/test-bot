
const test = require( 'tape' )
  , NPM = require( '../app/npm' )
  , Session = require( '../app/session' )
  , path = require( 'path' )
  , fs = require( 'fs' );

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