var gulp = require('gulp'),
		expect = require('chai').expect,
		license = require('../'),
		es = require('event-stream'),
		path = require('path'),
		fs = require('fs'),
		defaults = require('defaults'),
		clone = require('clone');

require('mocha');

describe('gulp-license plugin', function() {
	describe('gulp-license', function() {
		var metadata = {
					organization: 'Terin Stock',
					email: 'terinjokes@gmail.com',
					year: 2013,
					project: 'gulp-license'
				},
				filename = path.join(__dirname, './fixtures/test/data.js');

		function makeLicenseText(type, done) {
			gulp.file(filename)
				.pipe(license(type, metadata))
				.pipe(es.map(function(file) {
					var expected = fs.readFileSync(path.join(__dirname, './fixtures/expected/', type.toLowerCase() + '.js'), {encoding: 'utf8'});
					expect(String(file.contents)).to.equal(String(expected));
					done();
				}));
		}

		it('should add the MIT license to my file', function(done) {
			makeLicenseText('MIT', done);
		});

		it('should add the WTFPL license to my file', function(done) {
			makeLicenseText('WTFPL', done);
		});

		it('should add the MPL license to my file', function(done) {
			makeLicenseText('MPL', done);
		});

		it('should add the Apache license to my file', function(done) {
			makeLicenseText('Apache', done);
		});

		it('should add the BSD2 license to my file', function(done) {
			makeLicenseText('BSD2', done);
		});

		it('should add the BSD3 license to my file', function(done) {
			makeLicenseText('BSD3', done);
		});

		it('should add the GPL3 license to my file', function(done) {
			makeLicenseText('GPL3', done);
		});

		it('should throw an error if my file doesn\'t exist', function(done) {
			stream  = gulp.file(filename)
				.pipe(license('Terin', metadata));

			stream.on('error', function(error) {
				done();
			});
		});

		it('should add the MIT-type license to my file', function(done) {
			gulp.file(filename)
				.pipe(license('MIT', defaults(clone(metadata), {tiny: true})))
				.pipe(es.map(function(file) {
					var expected = fs.readFileSync(path.join(__dirname, './fixtures/expected/tiny-mit.js'), {encoding: 'utf8'});
					expect(String(file.contents)).to.equal(String(expected));
					done();
				}));
		});

		it('should return file.contents as a buffer', function(done) {
			gulp.file(filename)
				.pipe(license('MIT', defaults(clone(metadata), {tiny: true})))
				.pipe(es.map(function(file) {
					expect(file.contents).to.be.an.instanceof(Buffer);
					done();
				}));
		});
	});
});