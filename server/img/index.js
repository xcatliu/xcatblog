// Just a static server

var koa = require('koa');
var static = require('koa-static');

module.exports = function() {
  var config = this.config;
  var app = koa();

  // use koa-static
  app.use(static(config.img_dir));

  app.listen(config.img_port);
}