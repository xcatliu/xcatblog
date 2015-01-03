var fs = require('fs');
var path = require('path');

// Adding watch feature
var watch = require('watch');

// This function can parse a Markdown file with Front Matter
var parsePost = require('./parsePost');

module.exports = function() {
  // Will Automatic trigger one time at the beginning
  watch.watchTree(this.config.posts_dir, initDb.bind(this));
};

// Now let's building our database!
function initDb() {
  var db = {};
  // Get all posts first
  var posts = getPosts.call(this);
  db.posts = posts;
  this.db = db;
}

function getPosts() {
  return fs.readdirSync(this.config.posts_dir).filter(function(fileName) {
    // filter dot files
    return fileName.indexOf('.') !== 0;
  }).map(parsePost, this).sort(function(a, b) {
    // undefined should be in the last position
    if (typeof a.frontMatter.date === 'undefined') {
      return 1;
    }
    if (typeof b.frontMatter.date === 'undefined') {
      return -1;
    }
    return b.frontMatter.date - a.frontMatter.date;
  });
}