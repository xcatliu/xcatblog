var React = require('react');

module.exports = React.createClass({
  handleClick: function() {
    console.log(24);
  },
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
