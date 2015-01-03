var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="header">
        <nav className="whole">
          <a onClick={this.props.onLinkClick} href="/">Xcat Liu</a>
          <a onClick={this.props.onLinkClick} href="/posts">Blog</a>
        </nav>
      </header>
    );
  }
});
