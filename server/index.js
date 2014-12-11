var config;

if (process.env.NODE_ENV === 'production') {
  config = require('../config.json');
} else {
  config = require('../config.development.json');
}

var context = {
  config: config
};

var db = require('./db');
var api = require('./api')

db.call(context);
api.call(context);
