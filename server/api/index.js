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
      this.body = require('./' + api).apply(context, arguments);
    };
  };

};
