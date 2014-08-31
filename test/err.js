'use strict';
var test = require('tape'),
	gulpLicense = require('../'),
	Vinyl = require('vinyl');

var testContentsInput = 'module.exports = void 0';

var testFile = new Vinyl({
	cwd: '/home/terin/broken-promises/',
	base: '/home/terin/broken-promises/test',
	path: '/home/terin/broken-promises/test/test1.js',
	contents: new Buffer(testContentsInput)
});

test('should report an error when license type could not be found', function(t) {
	t.plan(1);

	var stream = gulpLicense('ISC', {organization: 'Terin Stock'});

	stream.on('data', function() {
		t.fail('the stream should have failed');
	});

	stream.on('error', function(err) {
		t.true(err instanceof Error, 'stream emits error');
	});

	stream.write(testFile);
	stream.end();
});
