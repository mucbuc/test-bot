
const test = require( 'tape' )
  , NPM = require( '../app/npm' )
  , path = require( 'path' )
  , fs = require( 'fs' )
  , tmp = require( 'tmp' );

test( 'should install tape', (t) => {

  tmp.dir( { unsafeCleanup: true }, (err, tempDir) => {

    const content = JSON.stringify( { dependencies: { "tape": "*" } } );
    fs.writeFileSync( path.join( tempDir, 'package.json' ), content );

    NPM
    .install( tempDir )
    .then( () => {
      
      const pathTape = path.join( tempDir, 'node_modules', 'tape' );
      fs.stat( pathTape, (err, stats) => {
        t.true( !err && stats.isDirectory(), "expected directory at " + pathTape );
        t.end();
      });
    
    }).catch( t.fail.bind( t ) );
  });

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