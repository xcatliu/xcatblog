var koa = require('koa');
var pkg = require('../package.json');
var app = koa();

// x-response-time

app.use(function *(next){
  console.log(1);
  var start = new Date;
  yield next;
  console.log(5);
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  console.log(2);
  var start = new Date;
  yield next;
  console.log(4);
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *() {
  console.log(3);
  this.body = 'Hello World';
});

app.listen(pkg.config.PORT || 8000);
