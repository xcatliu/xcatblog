module.exports = function () {
  var db = this.db;
  return function *() {
    var posts = db.posts.map(function(post) {
      return {
        url: post.url,
        title: post.title,
        date: post.date,
        html_url: post.html_url
      };
    });
    this.body = JSON.stringify(posts, null, 2);
  }
};