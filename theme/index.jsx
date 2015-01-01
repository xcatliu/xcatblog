var React = require('react');

var Head = require('./partial/head.jsx');
var Header = require('./partial/header.jsx');
var Footer = require('./partial/footer.jsx');
var Bundle = require('./partial/bundle.jsx');
var GoogleAnalytics = require('./partial/google-analytics.jsx');

var Content = require('./content.jsx');

var Scripts = require('./partial/scripts.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <Head />
        <body>
          <Header />
          <div id="content">
            <Content {...this.props} />
          </div>
          <Scripts {...this.props} />
        </body>
      </html>
    );
  }
});


/*
module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <Head />
        <body>
          <Header />
          <Content {...this.props} />
          <Footer />
          <Bundle />
          <GoogleAnalytics ga={this.props.config.ga} />
        </body>
      </html>
    );
  }
});
*/
