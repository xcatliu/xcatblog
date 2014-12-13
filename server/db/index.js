var fs = require('fs');
var path = require('path');
var watch = require('watch');
var _ = require('lodash');
var parsePost = require('./parsePost');

module.exports = function() {
  watch.watchTree(this.config.posts_dir, initDb.bind(this));
};

function initDb() {
  var db = {
    version: Date.now(),
    posts_url: this.config.site_url_api + '/posts{/post_id}'
  };
  var posts = getPosts.call(this);
  db.posts = posts;
  this.db = db;
}

function getPosts() {
  return fs.readdirSync(this.config.posts_dir).filter(function(fileName) {
    // filter dot files
    return fileName.indexOf('.') !== 0;
  }).map(parsePost, this);
}