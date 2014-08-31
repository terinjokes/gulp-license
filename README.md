# gulp-license [![Build Status](http://img.shields.io/travis/terinjokes/gulp-license.svg?style=flat)](https://travis-ci.org/terinjokes/gulp-license) [![](http://img.shields.io/npm/dm/gulp-license.svg?style=flat)](https://www.npmjs.org/package/gulp-license) [![](http://img.shields.io/npm/v/gulp-license.svg?style=flat)](https://www.npmjs.org/package/gulp-license) [![](http://img.shields.io/codeclimate/github/terinjokes/gulp-license.svg?style=flat)](https://codeclimate.com/github/terinjokes/gulp-license) [![](http://img.shields.io/codeclimate/coverage/github/terinjokes/gulp-license.svg?style=flat)](https://codeclimate.com/github/terinjokes/gulp-license)

> Add licenses to gulp stream.

## Installation

Install this package with npm and add it to your development dependencies:

`npm install --save-dev gulp-license`

## Usage

```javascript
var license = require('gulp-license');

gulp.task('license', function() {
  gulp.src('./lib/*.js')
    .pipe(license('MIT', {tiny: true}))
    .pipe(gulp.dest('./dist/'))
});
```
