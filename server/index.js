var config;

// Two Different Environment
if (process.env.NODE_ENV === 'production') {
  config = require('../config.json');
} else {
  config = require('../config.development.json');
}

/**
 * Need Configure First
 *
 * `context` will exist in the whole lifecycle,
 * and can access in each module as `this`.
 */
var context = {
  config: config
};

/**
 * Building In-memory Database
 * 
 * This line will add a `db` object to `context`.
 * Every file change in `config.posts_dir` will cause database rebuilding.
 * So set `config.posts_dir` to an *Auto Sync System* such as Dropbox,
 * the website will update automatic when your Dropbox updated.
 */
require('./db').call(context);

// Starting the main server, default port is 8000
require('./www').call(context);

// Starting the api server, default port is 8100
require('./api').call(context);