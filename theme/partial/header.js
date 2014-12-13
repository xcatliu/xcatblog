var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="header">
        <nav className="whole">
          <a href="/">Xcat Liu</a>
          <a href="/posts">Blog</a>
        </nav>
      </header>
    );
  }
});