var db = require('./db');
var config = require('../config.json');

var api = require('./api')

var context = {
  config: config
};

db.call(context);
api.call(context);
