var React = require('react');

var GoogleAnalytics = require('./partial/google-analytics.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <script src="/react-0.12.2.min.js" />
        <script src="/bundle.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: 'var Content = require("content");' +
                'React.render(' +
                '  React.createElement(Content, ' +
                JSON.stringify(this.props) +
                '  ), document.getElementById("content"))'
          }}
        />
        <GoogleAnalytics {...this.props} />
      </div>
    );
  }
});