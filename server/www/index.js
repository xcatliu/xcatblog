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

  app.listen(config.port);
};
