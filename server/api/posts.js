var _ = require('lodash');

module.exports = function() {
  return this.db.posts.map(function(post) {
    return _.omit(post, 'contentHTML');
  });
};