var React = require('react');
var ThemeEntrance = require('../../theme/index.jsx');

module.exports = function *() {
  this.body = '<!doctype HTML>' +
      React.renderToString(React.createElement(ThemeEntrance, {
        id: 'index'
      }));
};