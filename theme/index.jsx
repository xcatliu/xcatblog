var React = require('react');

var Head = require('./partial/head.jsx');
var Header = require('./partial/header.jsx');
var Footer = require('./partial/footer.jsx');
var Bundle = require('./partial/bundle.jsx');
var GoogleAnalytics = require('./partial/google-analytics.jsx');
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
  getInitialState: function() {
    return {
      id: this.props.id,
      db: this.props.db
    };
  },
  getContent: function() {
    var id = this.state.id;
    switch (true) {
      case id === 'index': return <Article id={this.state.id} db={this.state.db} />;
      case id === 'posts': return <Posts db={this.state.db} />;
      default: return (
        <div>
          <ArticleMeta id={this.state.id} db={this.state.db} />
          <Article id={this.state.id} db={this.state.db} />
          <Disqus disqus={this.props.config.disqus} />
        </div>
      );
    }
  },
  render: function() {
    return (
      <html>
        <Head />
        <body>
          <Header />
          <section className="whole">
            {this.getContent()}
          </section>
          <Footer />
          <Bundle />
          <GoogleAnalytics ga={this.props.config.ga} />
        </body>
      </html>
    );
  }
});