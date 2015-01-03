var React = require('react');

var Article = require('./index.jsx');
var Disqus = require('../partial/disqus.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <ArticleMeta {...this.props} />
        <Article {...this.props} />
        <Disqus {...this.props} />
      </div>
    );
  }
});

var ArticleMeta = React.createClass({
  getDate: function() {
    var date = new Date(this.props.data.frontMatter.date);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    var day = date.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  },
  render: function() {
    return (
      <section className="article-meta">
        <h1>{this.props.data.frontMatter.title}</h1>
        <address><a href="http://xcatliu.com">Xcat Liu</a></address>
        <time>{this.getDate()}</time>
        <hr />
      </section>
    );
  }
});
