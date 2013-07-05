var es = require('event-stream'),
		fs = require('fs'),
		path = require('path'),
		Mustache = require('mustache'),
		defaults = require('defaults'),
		clone = require('clone');

module.exports = function(type, options) {
	'use strict';
	function license(file, callback) {
		var newFile = {
					path: file.path,
					contents: file.contents
				},
				filename = options.tiny ? path.join(__dirname, './licenses/tiny.txt') : path.join(__dirname, './licenses/', type.toLowerCase() + '.txt');

		fs.exists(filename, function(exists) {
			if (exists) {
				fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
					if (err) {
						callback(err);
					}

					newFile.contents = Mustache.render(data, defaults(clone(options), {year: new Date().getFullYear(), license: type})) + newFile.contents;

					callback(null, newFile);
				});
			} else {
				callback(new Error('ENOENT, no such file or directory \'' + filename + '\''));
			}
		});
	}

	return es.map(license);
};
