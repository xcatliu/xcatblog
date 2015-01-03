var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <article
        dangerouslySetInnerHTML={{
          __html: this.props.date.contentHTML
        }}
      />
    );
  }
});
