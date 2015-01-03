module.exports = function() {
  var result = {};
  result.url = this.config.api_url;
  var post = this.db.posts.find(function(post) {
    return post.id === 'root';
  });
  result.contentHTML = post.contentHTML;
  return result;
};