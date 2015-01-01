var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <h1>{this.props.id}</h1>
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

var Article = React.createClass({
  getContent: function() {
    return this.props.db.posts.find(function(post) {
      return post.id === this.props.id;
    }, this).contentHTML;
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

var Posts = React.createClass({
  render: function() {
    var lis = this.props.db.posts.filter(function(post) {
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

module.exports = React.createClass({
  getContent: function() {
    var id = this.props.id;
    switch (true) {
      case id === 'index': return <Article id={this.props.id} db={this.props.db} />;
      case id === 'posts': return <Posts db={this.props.db} />;
      default: return (
        <div>
          <ArticleMeta id={this.props.id} db={this.props.db} />
          <Article id={this.props.id} db={this.props.db} />
          <Disqus disqus={this.props.config.disqus} />
        </div>
      );
    }
  },
  render: function() {
    return (
      <section className="whole">
        {this.getContent()}
      </section>
    );
  }
});
*/