#!/usr/bin/env node

'use strict';

const test = require( 'tape' );

test( 'fail', (t) => {
	t.fail();
	t.end();
});