var koa = require('koa');
var router = require('koa-router');
var posts = require('./posts');

module.exports = function() {
  var config = this.config;
  var db = this.db;
  var app = koa();

  app.use(router(app));

  app.get('/', function *() {
    var entrance = {
      posts_url: 'http://api.xcatliu.com/posts{/post_id}'
    };
    this.body = JSON.stringify(entrance, null, 2);
  });

  app.get('/posts', posts.call(this));

  app.listen(config.PORT_API);
};
