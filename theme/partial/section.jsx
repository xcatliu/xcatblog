var React = require('react');

var Article = require('./article.jsx');
var Posts = require('./posts.jsx')

module.exports = React.createClass({
  getSection: function() {
    var id = this.props.id;
    switch (true) {
      case id === 'root': return <Article {...this.props} />;
      case id === 'posts': return <Posts {...this.props} />;/*
      default: return (
        <div>
          <ArticleMeta {...this.props} />
          <Article {...this.props} />
          <Disqus {...this.props} />
        </div>
      );
*/
    }
  },
  render: function() {
    return (
      <section className="whole">
        {this.getSection()}
      </section>
    );
  }
});
