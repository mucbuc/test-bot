#!/usr/bin/env node

const NPM = require( './npm' );

class Repo {
  constructor(context) {
    this.path = context.path;
    this.cleanup = context.cleanup;
  }
}

module.exports = Repo;
