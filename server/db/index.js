var fs = require('fs');
var path = require('path');
var watch = require('watch');
var _ = require('lodash');
var parsePost = require('./parsePost');

module.exports = function() {
  watch.watchTree(this.config.posts_dir, initDb.bind(this));
};

function initDb() {
  var config = this.config;
  var posts_dir = this.config.posts_dir;
  var postsFileNames = fs.readdirSync(posts_dir);
  var posts = postsFileNames.filter(function(fileName) {
    // filter dot files
    return fileName.indexOf('.') !== 0;
  }).map(function(fileName) {
    var fileContent = fs.readFileSync(path.join(posts_dir, fileName)).toString();
    var id = path.basename(fileName, '.md');
    return _.merge({
      id: id,
      url: config.site_url_api + '/posts/' + id,
      html_url: config.site_url + '/posts/' + id + '.html'
    }, parsePost(fileContent));
  });
  this.db = {
    version: Date.now(),
    posts: posts
  };
}