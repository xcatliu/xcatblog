var React = require('react');
var fs = require('fs');

var css = fs.readFileSync('theme/index.css').toString();

module.exports = React.createClass({
  render: function() {
    return (
      <head>
        <title>{this.props.site_title}</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{css}</style>
      </head>
    );
  }
});