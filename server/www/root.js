var React = require('react');
var ThemeEntrance = require('../../theme/index.jsx');

var apiRoot = require('../api/root');

module.exports = function(context) {
  return function *() {
    this.body = '<!doctype HTML>' +
        React.renderToString(React.createElement(ThemeEntrance, {
          id: 'root',
          date: apiRoot.call(context),
          config: context.config
        }));
  };
};