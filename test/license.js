'use strict';
var test = require('tape'),
	gulpLicense = require('../'),
	Vinyl = require('vinyl');

var testContentsInput = 'module.exports = void 0';
var testContentsExpected = '/*! (c) 2014 Terin Stock (MIT) */\nmodule.exports = void 0';

var testFile1 = new Vinyl({
	cwd: '/home/terin/broken-promises/',
	base: '/home/terin/broken-promises/test',
	path: '/home/terin/broken-promises/test/test1.js',
	contents: new Buffer(testContentsInput)
});

var testFile2 = new Vinyl({
	cwd: '/home/terin/broken-promises/',
	base: '/home/terin/broken-promises/test',
	path: '/home/terin/broken-promises/test/test2.js',
	contents: new Buffer(testContentsInput)
});

test('should add tiny license to file', function(t) {
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

	stream.write(testFile1);
});

test('should add license to file', function(t) {
	t.plan(11);

	var stream = gulpLicense('MIT', {organization: 'Terin Stock'});

	stream.on('data', function(newFile) {
		var contents = String(newFile.contents);
		t.ok(newFile, 'emits a file');
		t.ok(newFile.path, 'file has a path');
		t.ok(newFile.relative, 'file has relative path information');
		t.ok(newFile.contents, 'file has contents');

		t.ok(newFile instanceof Vinyl, 'file is Vinyl');
		t.ok(newFile.contents instanceof Buffer, 'file contents are a buffer');

		t.true(/The above copyright notice/.test(contents), 'contains MIT license');
		t.false(/{{ year }}/.test(contents), 'does not contain template');
		t.true(/2014/.test(contents), 'does contain the current year');
		t.false(/{{ organization }}/.test(contents), 'does not contain template');
		t.true(/Terin Stock/.test(contents), 'does contain the author name');
	});

	stream.write(testFile2);
});
