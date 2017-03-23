#!/usr/bin/env node

const NPM = require( './npm' );

class Repo {
  constructor(context) {
    this.path = context.path;
    this.cleanup = context.cleanup;
  }

  runTest(repo = this) {
    return new Promise( (resolve, reject) => {
        
      NPM
      .installAndTest(repo.path)
      .then( onTestFinished.bind( null, { state: 'success', code: 200 } ) )
      .catch( err => {
        onTestFinished( { state: 'failure', error: err, code: 201 } );
      });
    
      function onTestFinished( testResult ) {
        repo.cleanup(); 
        resolve( testResult );
      }
    });
  }
}

module.exports = Repo;
