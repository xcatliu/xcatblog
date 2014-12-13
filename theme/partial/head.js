var React = require('react');
var fs = require('fs');

var css = fs.readFileSync('theme/index.css').toString();

module.exports = React.createClass({
  render: function() {
    return (
      <head>
        <title>Xcat Liu</title>
        <link rel="icon" href="http://img.xcatliu.com/avatar/xcatliu_32.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: css
          }}
        />
      </head>
    );
  }
});