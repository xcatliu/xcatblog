var koa = require('koa');
var route = require('koa-route');
var _ = require('lodash');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  app.use(route.get('/', function *() {
    this.body = _.omit(context.db, 'posts');
  }));

  app.use(route.get('/posts', function *() {
    this.body = context.db.posts.map(function(post) {
      return _.omit(post, 'contentHTML');
    });
  }));

  app.use(route.get('/posts/:id', function *(id) {
    this.body = context.db.posts.find(function(post) {
      return post.id === id;
    });
  }));

  app.listen(config.port_api);
};
