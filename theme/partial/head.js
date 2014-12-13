var React = require('react');
var fs = require('fs');

var css = fs.readFileSync('theme/index.css').toString();

module.exports = React.createClass({
  render: function() {
    return (
      <head>
        <title>Xcat Liu</title>
        <link rel="icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{
            __html: css
          }}
        />
      </head>
    );
  }
});