module.exports = function() {
  var result = {};
  result.layout = 'index';
  var post = this.db.posts.find(function(post) {
    return post.id === 'root';
  });
  result.contentHTML = post.contentHTML;
  return result;
};