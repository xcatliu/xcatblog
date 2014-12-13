var React = require('react');

var Head = require('./partial/head');
var Header = require('./partial/header');
var Footer = require('./partial/footer');
var GoogleAnalytics = require('./partial/google-analytics.js');
var Disqus = require('./partial/disqus.js');

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
          <GoogleAnalytics ga={this.props.config.ga} />
        </body>
      </html>
    );
  }
});