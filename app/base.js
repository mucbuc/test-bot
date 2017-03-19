#!/usr/bin/env node

'use strict';

const cp = require( 'child_process' );

function spawn(cmd, args, options, mute = false) {

  return new Promise( (resolve, reject) => {

    let error = ''
      , child = cp.spawn( cmd, args, options )
    .on( 'close', (code) => {
      if (code) {
        reject(error);
      }
      else {
        resolve(code);
      }
    })
    .on( 'error', reject );
  
    if (!mute && child.stdout) {
      child.stdout.pipe( process.stdout );
    }

    if (child.stderr) {
      
      if (!mute) {
        child.stderr.pipe( process.stderr );
      }

      child.stderr.on( 'data', (data) => {
        error += data;
      });
    }
  });
}

module.exports = {
  spawn: spawn
};