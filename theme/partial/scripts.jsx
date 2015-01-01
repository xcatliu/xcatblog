var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <script src="/react-0.12.2.js"></script>
        <script src="/bundle.min.js"></script>
        <script
          dangerouslySetInnerHTML={{__html:
            'var Content = require("content");' +
            'React.render(' +
            '  React.createElement(Content, ' + JSON.stringify(this.props) + '),' +
            '  document.getElementById("content")' +
            ');'
          }}
        />
      </div>
    );
  }
});


