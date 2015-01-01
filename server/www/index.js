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
  app.use(route.get('/', require('./root')));
/*
  // posts
  app.use(route.get('/posts', function *() {
    this.body = reactRender.call(context, 'posts');
  }));

  // post
  app.use(route.get('/posts/:id.html', function *(id) {
    this.body = reactRender.call(context, id);
  }));

  // bundle
  var bundleContent = '';
  require('./getBundle')(function(data) {
    bundleContent = data;
  });
  app.use(route.get('/index.js', function *() {
    this.type = 'application/javascript';
    this.body = bundleContent;
  }));

  // css
  var cssContent = fs.readFileSync('theme/index.css');
  app.use(route.get('/index.css', function *() {
    this.type = 'text/css';
    this.body = cssContent;
  }));
*/

  app.listen(this.config.port);
};

/*
function reactRender(id) {
  // Use renderToString to run React at server side
  return React.renderToString(React.createElement(ThemeEntrance, {
    id: id,
    config: this.config,
    db: this.db
  }));
}
*/