var React = require('react');

module.exports = React.createClass({
  getFilterProps: function() {
    var db = {};
    Object.keys(this.props.db).forEach(function(key) {
      db[key] = this.props.db[key];
    }, this);
    var post = this.props.db.posts.find(function(post) {
      return post.id === this.props.id;
    }, this);
    db.posts = [post];
    var result = {};
    Object.keys(this.props).forEach(function(key) {
      result[key] = this.props[key];
    }, this);
    result.db = db;
    return result;
  },
  render: function() {
    return (
      <div>
        <script src="/react-0.12.2.min.js"></script>
        <script src="/bundle.min.js"></script>
        <script
          dangerouslySetInnerHTML={{__html:
            'var Content = require("content");' +
            'React.render(' +
            '  React.createElement(Content, ' + JSON.stringify(this.getFilterProps()) + '),' +
            '  document.getElementById("content")' +
            ');'
          }}
        />
      </div>
    );
  }
});


