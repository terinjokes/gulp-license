'use strict';
var through = require('through2');

module.exports = function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
};
