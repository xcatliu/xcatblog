module.exports = function(callback) {
  var browserify = require('browserify');
  var b = browserify();
  b.require('react', { expose: 'react' });
  b.require('./theme/index.jsx', { expose: 'index' });
  var stream = b.transform({
    global: true
  }, 'uglifyify').bundle();
  var result = '';
  stream.on('data', function(data) {
    result += data;
  }).on('end', function() {
    callback(result);
  });
}