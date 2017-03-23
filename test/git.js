
const test = require( 'tape' )
  , GIT = require( '../app/git' )
  , Session = require( '../app/session' )
  , path = require( 'path' )
  , fs = require( 'fs' );

test( 'should fail to checkout', (t) => {

  const logic = new Session();

  GIT
  .pullRepo( path.join( __dirname, '../' ), 'nonsense' )
  .then( t.fail.bind( t ) )
  .catch( error => {
    t.notEqual( error.indexOf( "did not match any file" ) );
    t.end();
  });
});

test( 'should clone local repo', (t) => {

  const logic = new Session();

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
