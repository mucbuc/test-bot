#!/usr/bin/env node

/**
 * Encapsulates github credentials and github status api.  
 *
 * @summary 
 */

"use strict";

const assert = require( 'assert' )
  , fs = require( 'fs' )
  , path = require( 'path' )
  , GHStatusAPI = require( './ghstatus' );

class Session {
  
  constructor(context = {}) {
    this.token = context.hasOwnProperty('token') ? context.token : '';
    this.owner = context.hasOwnProperty('owner') ? context.owner : '';

    if (this.token.length) {
      this.gh = new GHStatusAPI( this.token ); 
    }
  }

  makeURLForRemote(repoName) {
    const tokenPart = this.token.length ? this.token + '@' : '';
    return 'https://' + tokenPart + 'github.com/' + path.join( this.owner, repoName ) + '.git';
  }

  createStatus(repo, sha, state) {
    if (sha.length) {
      this.gh.createStatus( { owner: this.owner, repo: repo, sha: sha, state: state } );
    }
  }
};

class SessionFactory {
  static createSession(bla) {
    return new Session(bla);
  }
};

module.exports = SessionFactory;
