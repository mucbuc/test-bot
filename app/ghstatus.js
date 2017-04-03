#!/usr/bin/env node

/**
 * github status API wrapper
 *
 * @summary github status updater
 *
 * @requires github
 */

"user strict"; 

const GH = require( 'github' );

class GHStatusAPI {

  constructor(token) {
    this.github = new GH();
    this.github.authenticate( { type: 'oauth', token: token });
  }

  createStatus(context) { 
    this.github.repos.createStatus( context, (err, res) => {
      if (err) {
        console.error( 'github api: error:', err );  
      }
    });
  }
}

module.exports = GHStatusAPI;