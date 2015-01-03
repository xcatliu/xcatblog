var React = require('react');

module.exports = React.createClass({
  render: function() {
    var lis = this.props.data.posts.map(function(post) {
      return (
        <li key={post.id}>
          <a onClick={this.props.onLinkClick} href={post.html_url}>
            {post.frontMatter.title}
          </a>
        </li>
      );
    }, this);
    return (
      <ul>
        {lis}
      </ul>
    );
  }
});
