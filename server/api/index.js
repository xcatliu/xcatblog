var koa = require('koa');
var route = require('koa-route');

module.exports = function() {
  var context = this;
  var app = koa();

  app.use(route.get('/', action('root')));
  app.use(route.get('/posts', action('posts')));
  app.use(route.get('/posts/:id', action('post')));

  app.listen(this.config.api_port);

  function action(api) {
    return function *() {
      this.set('Access-Control-Allow-Origin', context.config.url);
      this.set('Access-Control-Allow-Credentials', true);
      this.body = require('./' + api).apply(context, arguments);
    };
  };

};
