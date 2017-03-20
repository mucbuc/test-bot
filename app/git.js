#!/usr/bin/env node

'use strict';

const base = require( './base' )
  , tmp = require( 'tmp' )
  , Repo = require( './repo' );

function pullRepo(url, ref, sha = '') {

  return new Promise( (resolve, reject) => {
    tmp.dir( { unsafeCleanup: true }, (err, tempDir, cleanupCallback) => {
      
      if (err) throw err;
     
      git( ['init'] )
      .then( git.bind( null, [ 'pull', url, ref ] ) )
      .then( gitCheckout )
      .then( () => {
        resolve( new Repo( { path : tempDir, cleanup : cleanupCallback } ) );
      })
      .catch( reject );    
      
      function git(args) {
          
        console.log( 'git', args );

        return base.spawn( 'git', args, { cwd: tempDir } );
      }

      function gitCheckout() {
        if (sha.length) {
          return git( ['checkout', sha] );
        }
        else return new Promise( resolve => {
          resolve();
        });
      }

    });
  });
}

module.exports = {
  pullRepo: pullRepo
};
