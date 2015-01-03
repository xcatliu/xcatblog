// Enable require jsx directly
require('node-jsx').install({extension: '.jsx'})

var koa = require('koa');
var gzip = require('koa-gzip');
var route = require('koa-route');
var static = require('koa-static');

module.exports = function() {
  var context = this;
  var app = koa();

  app.use(gzip());

  app.use(static('./static'));
  app.use(route.get('/', action('root')));
  app.use(route.get('/posts', action('posts')));
  app.use(route.get('/posts/:id.html', action('post')));

  app.listen(this.config.port);

  function action(api) {
    return function *() {
      var props = {
        data: require('../api/' + api).apply(context, arguments),
        config: context.config
      };
      getHTML.call(this, props);
    };
  };

};

var React = require('react');
var ThemeHead = require('../../theme/head.jsx');
var ThemeContent = require('../../theme/content.jsx');
var ThemeScripts = require('../../theme/scripts.jsx');

function getHTML(props) {
  var head = React.renderToString(React.createElement(ThemeHead, props));
  var content = React.renderToString(React.createElement(ThemeContent, props));
  var scripts = React.renderToString(React.createElement(ThemeScripts, props));
  this.body = '<!doctype HTML><html>' + head + '<body>' +
      '<div id="content">' + content +'</div>' +
      scripts + '</body></html>';
}