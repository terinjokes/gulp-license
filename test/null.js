'use strict';
var test = require('tape');
var Vinyl = require('vinyl');
var gulpLicense = require('../');

var testFile = new Vinyl({
  cwd: '/home/terin/broken-promises/',
  base: '/home/terin/broken-promises/test',
  path: '/home/terin/broken-promises/test/test1.js',
  contents: null
});

test('should ignore null files', function (t) {
  t.plan(6);

  var stream = gulpLicense('MIT', {tiny: true, organization: 'Terin Stock'});

  stream.on('data', function (newFile) {
    t.ok(newFile, 'emits a file');
    t.ok(newFile.path, 'file has a path');
    t.ok(newFile.relative, 'file has relative path information');
    t.ok(!newFile.contents, 'file does not have contents');

    t.ok(newFile instanceof Vinyl, 'file is Vinyl');

    t.equals(newFile.contents, null);
  });

  stream.write(testFile);
  stream.end();
});
