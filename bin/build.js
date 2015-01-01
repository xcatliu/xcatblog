var fs = require('fs');
var browserify = require('browserify');
var literalify = require('literalify');

var writeStream = fs.createWriteStream('./static/bundle.min.js');
browserify()
  .require('./theme/content.jsx', {expose: 'content'})
  .transform({ global: true }, literalify.configure({react: 'window.React'}))
  .bundle()
  .pipe(writeStream);
