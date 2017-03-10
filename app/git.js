#!/usr/bin/env node

'use strict';

const path = require( 'path' )
  , user = 'mucbuc'
  , cp = require( 'child_process' );

function cloneRepo(repoName, repoPath)
{	
	console.log( arguments );
	return new Promise( (resolve, reject) => {
		const url = 'https://github.com/' + path.join( user, repoName ) + '.git';
		
		console.log( 'git clone ' + url + ' ' + repoPath );

		cp.exec( 'git clone ' + url + ' ' + repoPath, (error, stdout, stderr) => {
			if (error) throw error;
			process.stdout.write( stdout );
			process.stderr.write( stderr );
			resolve();
		});
	});
}

module.exports = {
	cloneRepo: cloneRepo
};

function spawn(cmd, args) {
	return new Promise( (resolve, reject) => {
		cp.spawn( cmd, args, { stdio: 'inherit' } )
		.on( 'close', resolve )
		.on( 'error', reject );
	});
}

//cloneRepo( 'kb', './tmp' );
