var React = require('react');

var Article = require('./article.jsx');

module.exports = React.createClass({
  getSection: function() {
    var id = this.props.id;
    switch (true) {
      case id === 'index': return <Article {...this.props} />;/*
      case id === 'posts': return <Posts {...this.props} />;
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
