var es = require('event-stream'),
		fs = require('fs'),
		path = require('path'),
		Mustache = require('mustache'),
		defaults = require('defaults');

// simple cache so we dont keep reading the same files
var cache = {};
var getLicenseFile = function(file, callback) {
	'use strict';

	if (cache[file]) {
		return callback(null, cache[file]);
	}

	var filename = path.join(__dirname, './licenses/', file);

	fs.readFile(filename, function(err, data) {
		if (err) {
			return callback(err);
		}
		cache[file] = String(data);
		callback(null, cache[file]);
	});
};

module.exports = function(type, options) {
	'use strict';

	var opts = defaults(options, {year: new Date().getFullYear(), license: type});
	function license(file, callback) {
		var filename = (options.tiny ? 'tiny' : type.toLowerCase()) + '.txt';

		getLicenseFile(filename, function(err, data){
			if (err) {
				return callback(err);
			}

			file.contents = new Buffer(Mustache.render(data, opts) + file.contents);

			return callback(null, file);
		});
	}

	return es.map(license);
};
