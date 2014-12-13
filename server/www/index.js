// Enable require jsx directly
require('node-jsx').install()

var koa = require('koa');
var route = require('koa-route');
var React = require('react');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(route.get('/', function *() {
    var reactElement = React.createElement(require('../../theme'), {
      id: 'index',
      db: context.db
    });
    this.body = React.renderToString(reactElement);
  }));

  app.use(route.get('/posts', function *() {
    var reactElement = React.createElement(require('../../theme'), {
      id: 'posts',
      db: context.db
    });
    this.body = React.renderToString(reactElement);
  }));

  app.use(route.get('/posts/:id.html', function *(id) {
    var reactElement = React.createElement(require('../../theme'), {
      id: id,
      db: context.db
    });
    this.body = React.renderToString(reactElement);
  }));

  app.listen(config.port);
};