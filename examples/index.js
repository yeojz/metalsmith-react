'use strict';

var Metalsmith = require('metalsmith');
var reactTemplate = require('metalsmith-react-templates');
var browserify = require('metalsmith-browserify');
var babelify = require('babelify');

new Metalsmith(__dirname)
  .clean(true)
  .use(reactTemplate({
    babel: false,
    directory: 'templates',
    baseFile: 'base.html',
    nonStatic: true
  }))
  .use(browserify({
    files: ['../scripts/loader.js'],
    dest: 'bundle.js',
    transforms: [babelify]
  }))
  .destination('./build')
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
