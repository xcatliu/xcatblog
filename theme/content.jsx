var url = require('url');
var React = require('react');

var Header = require('./partial/header.jsx');
var Footer = require('./partial/footer.jsx');

var layout = {
  index: require('./layout/index.jsx'),
  archive: require('./layout/archive.jsx'),
  post: require('./layout/post.jsx')
};

module.exports = React.createClass({
  getInitialState: function() {
    return this.props;
  },
  getLayout: function() {
    var Layout = layout[this.state.data.layout];
    return (
      <Layout
        {...this.state}
        onLinkClick={this.handleLinkClick}
      />
    );
  },
  handleLinkClick: function(e) {
    action.call(this, e.target.href);
    e.preventDefault();
  },
  updateData: function(data) {
    this.setState({
      data: data
    });
  },
  render: function() {
    return (
      <div>
        <Header
          onLinkClick={this.handleLinkClick}
        />
        <section className='whole'>
          {this.getLayout()}
        </section>
        <Footer />
      </div>
    );
  }
});

var ajax = require('xcat-ajax');

function action(href) {
  var u = url.parse(href);
  var pathname = u.pathname;
  var api_url = this.state.config.api_url;
  var id = '';
  if (pathname === '/') {
    ajax({
      url: api_url,
      callback: function(error, data) {
        if (error) {
          throw error;
        }
        this.updateData(data);
      }.bind(this)
    })
  } else if (pathname === '/posts') {
    ajax({
      url: api_url + '/posts',
      callback: function(error, data) {
        if (error) {
          throw error;
        }
        this.updateData(data);
      }.bind(this)
    })
  } else if (pathname.indexOf('/posts/') === 0) {
    id = pathname.replace('/posts/', '').replace('.html', '');
    ajax({
      url: api_url + '/posts/' + id,
      callback: function(error, data) {
        if (error) {
          throw error;
        }
        this.updateData(data);
      }.bind(this)
    })
  }
  history.pushState(null, null, href);
}