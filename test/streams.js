'use strict';
var Stream = require('stream');
var test = require('tape');
var Readable = Stream.Readable;
var Vinyl = require('vinyl');
var concat = require('concat-stream');
var gulpLicense = require('../');

var currentYear = (new Date()).getFullYear();
var testContentsInput = 'module.exports = void 0';
var testContentsExpected = '/*! (c) ' + currentYear + ' Terin Stock (MIT) */\nmodule.exports = void 0';

var testFile = new Vinyl({
  cwd: '/home/terin/broken-promises/',
  base: '/home/terin/broken-promises/test',
  path: '/home/terin/broken-promises/test/test1.js',
  contents: stringStream()
});

test('should add license to streams', function (t) {
  t.plan(7);

  var stream = gulpLicense('MIT', {
    tiny: true,
    organization: 'Terin Stock'
  });

  stream.on('data', function (newFile) {
    t.ok(newFile, 'emits a file');
    t.ok(newFile.path, 'file has a path');
    t.ok(newFile.relative, 'file has relative path information');
    t.ok(newFile.contents, 'file has contents');

    t.ok(newFile instanceof Vinyl, 'file is Vinyl');
    t.ok(newFile.contents instanceof Stream, 'file contents are a Stream');

    newFile.contents.pipe(concat({
      encoding: 'string'
    }, function (contents) {
      t.equals(contents, testContentsExpected);
    }));
  });

  stream.write(testFile);
  stream.end();
});

function stringStream() {
  var stream = new Readable();

  stream._read = function () {
    this.push(testContentsInput);
    this.push(null);
  };

  return stream;
}
