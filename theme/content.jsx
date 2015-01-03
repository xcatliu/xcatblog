var React = require('react');

var Header = require('./partial/header.jsx');
var Section = require('./partial/section.jsx');
var Footer = require('./partial/footer.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Section {...this.props} />
        <Footer />
      </div>
    );
  }
});

/*

var Disqus = require('./partial/disqus.jsx');

var ArticleMeta = React.createClass({
  getFrontMatter: function() {
    return this.props.db.posts.find(function(post) {
      return post.id === this.props.id;
    }, this).frontMatter;
  },
  render: function() {
    var frontMatter = this.getFrontMatter();
    return (
      <section className="article-meta">
        <h1>{frontMatter.title}</h1>
        <address><a href="http://xcatliu.com">Xcat Liu</a></address>
        <time>{frontMatter.date.toString()}</time>
        <hr />
      </section>
    );
  }
});



*/