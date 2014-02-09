'use strict';
var test = require('tape'),
	gulpLicense = require('../'),
	Vinyl = require('vinyl');

var testContentsInput = 'module.exports = void 0';
var testContentsExpected = '/*! (c) 2014 Terin Stock (MIT) */\nmodule.exports = void 0';

var testFile = new Vinyl({
	cwd: '/home/terin/broken-promises/',
	base: '/home/terin/broken-promises/test',
	path: '/home/terin/broken-promises/test/test1.js',
	contents: new Buffer(testContentsInput)
});

test('should add license to file', function(t) {
	t.plan(7);

	var stream = gulpLicense('MIT', {tiny: true, organization: 'Terin Stock'});

	stream.on('data', function(newFile) {
		t.ok(newFile, 'emits a file');
		t.ok(newFile.path, 'file has a path');
		t.ok(newFile.relative, 'file has relative path information');
		t.ok(newFile.contents, 'file has contents');

		t.ok(newFile instanceof Vinyl, 'file is Vinyl');
		t.ok(newFile.contents instanceof Buffer, 'file contents are a buffer');

		t.equals(String(newFile.contents), testContentsExpected);
	});

	stream.write(testFile);
});
