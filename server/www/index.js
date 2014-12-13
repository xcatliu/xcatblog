var koa = require('koa');
var router = require('koa-router');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(router(app));

  app.get('/', function *() {
    this.body = 'Hello World';
  });

  app.get('/posts', function *() {
    this.body = context.db.posts;
  });

  app.get('/posts/:id.html', function *() {
    this.body = context.db['posts/' + this.params.id].contentHTML;
  });

  app.listen(config.port);
};
