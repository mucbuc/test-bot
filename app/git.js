#!/usr/bin/env node

/**
 * Collection of methods around git functionality.
 *
 * @summary   git functionality.
 *
 * @requires tmp
 */

'use strict';

const base = require( './base' )
  , tmp = require( 'tmp' );

function pullRepo(url, ref = '', sha = '') {

  return new Promise( (resolve, reject) => {
    tmp.dir( { unsafeCleanup: true }, (err, tempDir, cleanupCallback) => {
      
      if (err) throw err;
     
      git( ['init'] )
      .then( git.bind( null, [ 'pull', url, ref ] ) )
      .then( gitCheckout )
      .then( () => {
        resolve( { path : tempDir, cleanup : cleanupCallback } );
      })
      .catch( reject );    
      
      function git(args) {
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
