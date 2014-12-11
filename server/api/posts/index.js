var _ = require('lodash');

module.exports = function () {
  var context = this;
  return function *() {
    var posts = context.db.posts.map(function(post) {
      return _.merge({
        id: post.id,
        url: post.url,
        html_url: post.html_url
      }, post.frontMatter);
    });
    this.body = JSON.stringify(posts, null, 2);
  }
};


function post(id) {
  var post = this.db.posts.filter(function(post) {
    return post.id === id;
  })[0];
  // https://lodash.com/docs#omit
  return _.omit(post, ['frontMatter', 'content']);
}