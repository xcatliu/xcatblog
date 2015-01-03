var React = require('react');
var ThemeEntrance = require('../../theme/index.jsx');

var apiPosts = require('../api/posts');

module.exports = function(context) {
  return function *() {
    this.body = '<!doctype HTML>' +
        React.renderToString(React.createElement(ThemeEntrance, {
          id: 'posts',
          date: apiPosts.call(context),
          config: context.config
        }));
  };
};