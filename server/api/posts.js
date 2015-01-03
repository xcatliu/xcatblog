module.exports = function() {
  var result = {};
  result.layout = 'archive';
  result.posts = this.db.posts.map(function(post) {
    return {
      id: post.id,
      html_url: this.config.url + '/posts/' + post.id + '.html',
      frontMatter: post.frontMatter
    };
  }, this);
  return result;
};