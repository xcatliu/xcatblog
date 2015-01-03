module.exports = function(id) {
  var result = {};
  result.layout = 'post';
  var post = this.db.posts.find(function(post) {
    return post.id === id;
  });
  result.frontMatter = post.frontMatter;
  result.contentHTML = post.contentHTML;
  return result;
};