var koa = require('koa');
var router = require('koa-router');
var pkg = require('../../package.json');
var app = koa();

app.use(router(app));

app.get('/', function *() {
  var entrance = {
    posts_url: 'http://api.xcatliu.com/posts{/post_id}'
  };
  this.body = JSON.stringify(entrance, null, 2);
});

app.listen(pkg.config.PORT_API);
