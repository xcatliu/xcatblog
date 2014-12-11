var _ = require('lodash');

module.exports = function () {
  var context = this;
  return function *() {
    var id = this.params.id;
    var post = context.db.posts.filter(function(post) {
      return post.id === id;
    })[0];
    // https://lodash.com/docs#omit
    post = _.omit(post, ['frontMatter', 'content']);
    this.body = JSON.stringify(post, null, 2);
  }
};