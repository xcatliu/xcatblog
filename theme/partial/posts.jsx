var React = require('react');

module.exports = React.createClass({
  render: function() {
    var lis = this.props.date.filter(function(post) {
      return typeof post.frontMatter.layout === 'undefined';
    }).map(function(post) {
      return (
        <li><a href={post.html_url}>{post.frontMatter.title}</a></li>
      );
    });
    return (
      <ul>
        {lis}
      </ul>
    );
  }
});
