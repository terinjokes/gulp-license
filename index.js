var es = require('event-stream'),
		fs = require('fs'),
		path = require('path'),
		Mustache = require('mustache'),
		defaults = require('defaults'),
		clone = require('clone');

module.exports = function(type, options) {
	'use strict';

	var opts = defaults(clone(options), {year: new Date().getFullYear(), license: type});
	function license(file, callback) {
		var newFile = clone(file),
				filename = path.join(__dirname, './licenses/', (options.tiny ? 'tiny' : type.toLowerCase()) + '.txt');

		fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
			if (err) {
				return callback(err);
			}

			newFile.contents = new Buffer(Mustache.render(data, opts) + newFile.contents);

			return callback(null, newFile);
		});
	}

	return es.map(license);
};
