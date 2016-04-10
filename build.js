#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var dot = require('dot');
var defaults = require('defaults');
var rat = require('rat');

var options = defaults({
  strip: false,
  selfcontained: true
}, dot.templateSettings);

var licenses = {};

rat.ls(path.resolve(__dirname, './licenses'), function (err, files) {
  if (err) {
    return;
  }
  var expected = files.length - 1;
  files.forEach(function (file) {
    var license = path.basename(file.path, '.txt');
    fs.readFile(file.path, 'utf8', function (err, data) {
      if (err) {
        return;
      }

      licenses[license] = dot.template(data, options).toString().replace('anonymous', license);

      if (--expected <= 0) {
        var out = 'module.exports = {';
        Object.keys(licenses).forEach(function (license, idx, array) {
          out += license + ':' + licenses[license];

          if (idx < array.length - 1) {
            out += ',';
          }
        });
        out += '}';
        fs.writeFile(path.resolve(__dirname, './lib/licenses.js'), out, 'utf8', function (err) {
          if (err) {
            return;
          }
        });
      }
    });
  });
});
