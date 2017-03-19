#!/usr/bin/env node

class Repo {
	constructor(context) {
		this.path = context.path;
		this.cleanup = context.cleanup;
	}
}

module.exports = Repo;