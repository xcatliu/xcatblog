var React = require('react');

var Header = require('./partial/header.jsx');
var Footer = require('./partial/footer.jsx');

var layout = {
  index: require('./layout/index.jsx'),
  archive: require('./layout/archive.jsx'),
  post: require('./layout/post.jsx')
};

module.exports = React.createClass({
  getLayout: function() {
    var Layout = layout[this.props.data.layout];
    return <Layout {...this.props} />;
  },
  render: function() {
    return (
      <div>
        <Header />
        <section className='whole'>
          {this.getLayout()}
        </section>
        <Footer />
      </div>
    );
  }
});

/*

var Disqus = require('./partial/disqus.jsx');




*/