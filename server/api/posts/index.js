var _ = require('lodash');

module.exports = function () {
  var context = this;
  return function *() {
    var id = this.params.id;
    if (typeof id === 'undefined') {
      this.body = JSON.stringify(posts.call(context), null, 2);
    } else {
      this.body = JSON.stringify(post.call(context, id), null, 2);
    }
  }
};

function posts() {
  return this.db.posts.map(function(post) {
    return _.merge({
      id: post.id,
      url: post.url,
      html_url: post.html_url
    }, post.frontMatter);
  });
}

function post(id) {
  var post = this.db.posts.filter(function(post) {
    return post.id === id;
  })[0];
  // https://lodash.com/docs#omit
  return _.omit(post, ['frontMatter', 'content']);
}