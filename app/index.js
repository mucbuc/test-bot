#!/usr/bin/env node

"use strict";

const assert = require( 'assert' )
  , express = require( 'express' )
  , app = express()
  , git = require( './git' )
  , path = require( 'path' )
  , tmp = require( 'tmp' );

app
.get( '/build-bot/*', (req, res) => {

	assert( req.params.length != 0 );

	const repo = req.params[0];
	
	tmp.dir( { unsafeCleanup: true }, (err, tempDir, cleanupCallback) => {
		if (err) throw err;
		git.cloneRepo( repo, path.join( tempDir ) )
		.then( () => {
			cleanupCallback();
			res.send( 'done' );
		});
	});
})
.listen( '3000', () => {
	console.log( 'listening' );
});
