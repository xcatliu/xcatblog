// Enable require jsx directly
require('node-jsx').install({extension: '.jsx'})

var fs = require('fs');
var koa = require('koa');
var gzip = require('koa-gzip');
var route = require('koa-route');

/**
 * Use React to make Isomorphic Application,
 * that, render html in both server side and client side.
 * more information, http://facebook.github.io/react/
 */
var React = require('react');
var ThemeEntrance = require('../../theme/index.jsx');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(gzip());

  app.use(route.get('/', function *() {
    this.body = reactRender.call(context, 'index');
  }));

  app.use(route.get('/posts', function *() {
    this.body = reactRender.call(context, 'posts');
  }));

  app.use(route.get('/posts/:id.html', function *(id) {
    this.body = reactRender.call(context, id);
  }));

  var bundleContent = '';
  require('./getBundle')(function(data) {
    bundleContent = data;
  });
  app.use(route.get('/index.js', function *() {
    this.type = 'application/javascript';
    this.body = bundleContent;
  }));

  var cssContent = fs.readFileSync('theme/index.css');
  app.use(route.get('/index.css', function *() {
    this.type = 'text/css';
    this.body = cssContent;
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