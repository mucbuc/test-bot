#!/usr/bin/env node

'use strict';

const base = require( './base' );

function installAndTest(repoPath, mute = false) {
  return install(repoPath).then( spawn.bind( null, [ 'test' ], repoPath, mute ) );
}

function install(repoPath) {
  return spawn([ 'install' ], repoPath);
}

function spawn(args, repoPath, mute = false) {
  return base.spawn( 'npm', args, { cwd: repoPath }, mute );
}

module.exports = {
  installAndTest: installAndTest,
  install: install
};