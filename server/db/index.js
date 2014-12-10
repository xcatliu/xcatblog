var parsePost = require('./parsePost');
var fs = require('fs');

module.exports = function() {
  return {
    posts: [{
      url: 'http://api.xcatliu.com/posts/first-post',
      title: 'First Post',
      date: '2014-12-14',
      html_url: 'http://xcatliu.com/posts/first-post.html',
      content: '# Title\n\nContent'
    }]
  };
};