var koa = require('koa');
var router = require('koa-router');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(router(app));

  app.get('/', function *() {
    var entrance = {
      posts_url: config.site_url_api + '/posts{/post_id}'
    };
    this.body = JSON.stringify(entrance, null, 2);
  });

  var posts = require('./posts').call(this);

  app.get('/posts', posts);
  app.get('/posts/:id', posts);

  app.listen(config.port_api);
};
