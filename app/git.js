#!/usr/bin/env node

'use strict';

const base = require( './base' )
  , tmp = require( 'tmp' )
  , Repo = require( './repo' );

function pullRepo(url, ref = '') {

  return new Promise( (resolve, reject) => {
    tmp.dir( { unsafeCleanup: true }, (err, tempDir, cleanupCallback) => {
      
      if (err) throw err;
     
      git( ['init'] )
      .then( git.bind( null, [ 'pull', url ] ) )
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
        if (ref.length) {
          return git( ['checkout', ref] );
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
