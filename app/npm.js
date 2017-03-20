#!/usr/bin/env node

'use strict';

const base = require( './base' );

function installAndTest(repoPath, mute = false) {
  return install(repoPath, mute).then( spawn.bind( null, [ 'test' ], repoPath, mute ) );
}

function install(repoPath, mute = false) {
  return spawn([ 'install' ], repoPath, mute);
}

function spawn(args, repoPath, mute = false) {
  return base.spawn( 'npm', args, { cwd: repoPath }, mute );
}

module.exports = {
  installAndTest: installAndTest,
  install: install
};