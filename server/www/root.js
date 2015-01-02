var React = require('react');
var ThemeEntrance = require('../../theme/index.jsx');

module.exports = function(context) {
  return function *() {
    this.body = '<!doctype HTML>' +
        React.renderToString(React.createElement(ThemeEntrance, {
          id: 'index',
          db: context.db,
          config: context.config
        }));
  };
};