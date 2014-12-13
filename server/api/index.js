var koa = require('koa');
var router = require('koa-router');
var _ = require('lodash');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(router(app));

  app.get('/', function *() {
    this.body = _.omit(context.db, 'posts');
  });

  app.get('/posts', function *() {
    this.body = context.db.posts;
  });

  app.get('/posts/:id', function *() {
    this.body = context.db['posts/' + this.params.id];
  });

  app.listen(config.port_api);
};
