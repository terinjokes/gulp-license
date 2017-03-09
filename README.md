# gulp-license [![][travis-shield-img]][travis-shield][![][npm-dl-shield-img]][npm-shield][![][npm-v-shield-img]][npm-shield][![][coveralls-shield-img]][coveralls-shield]

[![Greenkeeper badge](https://badges.greenkeeper.io/terinjokes/gulp-license.svg)](https://greenkeeper.io/)

> Add licenses to gulp stream.

## Installation

Install this package with npm and add it to your development dependencies:

`npm install --save-dev gulp-license`

## Usage

```javascript
var gulp = require('gulp');
var license = require('gulp-license');
var pump = require('pump');

gulp.task('license', function (cb) {
  pump([
      gulp.src('./lib/*.js'),
      license('MIT', {tiny: true}),
      gulp.dest('./dist')
    ],
    cb
  );
});
```

To help properly handle error conditions with Node streams, this project
recommends the use of [`pump`](https://github.com/mafintosh/pump). For more
information, see [Why Use Pump?](https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump)

[travis-shield-img]: https://img.shields.io/travis/terinjokes/gulp-license/master.svg?label=Travis%20CI&style=flat-square
[travis-shield]: https://travis-ci.org/terinjokes/gulp-license
[npm-dl-shield-img]: https://img.shields.io/npm/dm/gulp-license.svg?style=flat-square
[npm-shield]: http://browsenpm.org/package/gulp-license
[npm-v-shield-img]: https://img.shields.io/npm/v/gulp-license.svg?style=flat-square
[coveralls-shield-img]: https://img.shields.io/codeclimate/coverage/github/terinjokes/gulp-license.svg?style=flat-square
[coveralls-shield]: https://codeclimate.com/github/terinjokes/gulp-license
