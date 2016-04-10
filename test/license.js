'use strict';
var test = require('tape');
var Vinyl = require('vinyl');
var gulpLicense = require('../');

var currentYear = (new Date()).getFullYear();
var testContentsInput = 'module.exports = void 0';
var testContentsExpected = '/*! (c) ' + currentYear + ' Terin Stock (MIT) */\nmodule.exports = void 0';

test('should add tiny license to file', function (t) {
  t.plan(7);

  var testFile = new Vinyl({
    cwd: '/home/terin/broken-promises/',
    base: '/home/terin/broken-promises/test',
    path: '/home/terin/broken-promises/test/test1.js',
    contents: new Buffer(testContentsInput)
  });

  var stream = gulpLicense('MIT', {tiny: true, organization: 'Terin Stock'});

  stream.on('data', function (newFile) {
    t.ok(newFile, 'emits a file');
    t.ok(newFile.path, 'file has a path');
    t.ok(newFile.relative, 'file has relative path information');
    t.ok(newFile.contents, 'file has contents');

    t.ok(newFile instanceof Vinyl, 'file is Vinyl');
    t.ok(newFile.contents instanceof Buffer, 'file contents are a buffer');

    t.equals(String(newFile.contents), testContentsExpected);
  });

  stream.write(testFile);
  stream.end();
});

test('should add license to file', function (t) {
  t.plan(11);

  var testFile = new Vinyl({
    cwd: '/home/terin/broken-promises/',
    base: '/home/terin/broken-promises/test',
    path: '/home/terin/broken-promises/test/test1.js',
    contents: new Buffer(testContentsInput)
  });

  var stream = gulpLicense('MIT', {organization: 'Terin Stock'});

  stream.on('data', function (newFile) {
    var contents = String(newFile.contents);
    t.ok(newFile, 'emits a file');
    t.ok(newFile.path, 'file has a path');
    t.ok(newFile.relative, 'file has relative path information');
    t.ok(newFile.contents, 'file has contents');

    t.ok(newFile instanceof Vinyl, 'file is Vinyl');
    t.ok(newFile.contents instanceof Buffer, 'file contents are a buffer');

    t.true(/The above copyright notice/.test(contents), 'contains MIT license');
    t.false(/{{ year }}/.test(contents), 'does not contain template');
    t.true((new RegExp(currentYear)).test(contents), 'does contain the current year');
    t.false(/{{ organization }}/.test(contents), 'does not contain template');
    t.true(/Terin Stock/.test(contents), 'does contain the author name');
  });

  stream.write(testFile);
  stream.end();
});
