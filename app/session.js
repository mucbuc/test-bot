#!/usr/bin/env node

"use strict";

const assert = require( 'assert' )
  , fs = require( 'fs' )
  , path = require( 'path' )
  , GIT = require( './git' )
  , GHStatusAPI = require( './ghstatus' );

class Session {
  
  constructor(context = {}) {
    this.token = context.hasOwnProperty('token') ? context.token : '';
    this.owner = context.hasOwnProperty('owner') ? context.owner : '';

    if (this.token.length) {
      this.gh = new GHStatusAPI( this.token ); 
    }
  }

  pullRemoteRepo(repoName, ref, sha = '') {
    const tokenPart = this.token.length ? this.token + '@' : '';
    const url = 'https://' + tokenPart + 'github.com/' + path.join( this.owner, repoName ) + '.git';
    return GIT.pullRepo( url, ref, sha );
  }

  createStatus(repo, sha, state) {
    if (sha.length) {
      this.gh.createStatus( { owner: this.owner, repo: repo, sha: sha, state: state } );
    }
  }
}

module.exports = Session;
