var config;

if (process.env.NODE_ENV === 'production') {
  config = require('../config.json');
} else {
  config = require('../config.development.json');
}

var context = {
  config: config
};

require('./db').call(context);

require('./www').call(context);
require('./api').call(context);