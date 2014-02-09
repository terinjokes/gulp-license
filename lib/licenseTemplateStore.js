'use strict';
var fs = require('fs'),
	path = require('path'),
	template = require('lodash.template');

// simple cache so we don't keep reading the same files
var cache = {};
module.exports.get = function(license, callback) {

	if (cache[license]) {
		return process.nextTick(callback.bind(null, null, cache[license]));
	}

	var filename = path.join(__dirname, '../licenses/', license + '.txt');

	fs.readFile(filename, function(err, data) {
		if (err) {
			return callback(err);
		}
		cache[license] = template(String(data), null, {
			interpolate: /{{([\s\S]+?)}}/g
		});
		callback(null, cache[license]);
	});
};
