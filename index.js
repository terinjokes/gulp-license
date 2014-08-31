'use strict';
var defaults = require('defaults'),
		through = require('through2'),
		getLicenseTemplate = require('./lib/licenseTemplateStore').get,
		prefixStream = require('./lib/prefixStream');

module.exports = function(type, options) {

	var opts = defaults(options, {
		year: new Date().getFullYear(),
		license: type
	});
	var licenseKey = options.tiny ? 'tiny' : type.toLowerCase();

	function license(file, encoding, callback) {

		if (file.isNull()) {
			return callback(null, file);
		}

		getLicenseTemplate(licenseKey, function(err, template) {
			if (err) {
				return callback(err);
			}

			if (file.isBuffer()) {

				file.contents = new Buffer(template(opts) + file.contents);
			}

			if (file.isStream()) {
				file.contents = file.contents.pipe(prefixStream(template(opts)));
			}

			return callback(null, file);
		});
	}

	return through.obj(license);
};
