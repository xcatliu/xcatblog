// Enable require jsx directly
require('node-jsx').install()

var koa = require('koa');
var route = require('koa-route');

/**
 * Use React to make Isomorphic Application,
 * that, render html in both server side and client side.
 * more information, http://facebook.github.io/react/
 */
var React = require('react');
var ThemeEntrance = require('../../theme');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(route.get('/', function *() {
    this.body = reactRender.call(context, 'index');
  }));

  app.use(route.get('/posts', function *() {
    this.body = reactRender.call(context, 'posts');
  }));

  app.use(route.get('/posts/:id.html', function *(id) {
    this.body = reactRender.call(context, id);
  }));

  app.listen(config.port || 8000);
};

function reactRender(id) {
  // Use renderToString to run React at server side
  return React.renderToString(React.createElement(ThemeEntrance, {
    id: id,
    config: this.config,
    db: this.db
  }));
}