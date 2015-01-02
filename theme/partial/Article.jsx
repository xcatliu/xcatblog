var React = require('react');

module.exports = React.createClass({
  getContent: function() {
    return this.props.db.posts.filter(function(post) {
      return post.id === this.props.id;
    }, this)[0].contentHTML;
  },
  render: function() {
    return (
      <article
        dangerouslySetInnerHTML={{
          __html: this.getContent()
        }}
      />
    );
  }
});
