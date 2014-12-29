var koa = require('koa');
var route = require('koa-route');

var _ = require('lodash');

module.exports = function() {
  var context = this;
  var config = this.config;
  var app = koa();

  // root
  app.use(route.get('/', function *() {
    // https://lodash.com/docs#omit
    this.body = _.omit(context.db, 'posts');
  }));

  // posts
  app.use(route.get('/posts', function *() {
    this.body = context.db.posts.map(function(post) {
      return _.omit(post, 'contentHTML');
    });
  }));

  // a post
  app.use(route.get('/posts/:id', function *(id) {
    this.body = context.db.posts.find(function(post) {
      return post.id === id;
    });
  }));

  app.listen(config.api_port);
};
