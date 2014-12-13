var React = require('react');

module.exports = React.createClass({
  render: function() {
    if (typeof this.props.disqus === 'undefined') {
      return null;
    }
    var scriptContent = "" +
        "var disqus_shortname = '" + this.props.disqus + "';" +
        "(function() {" +
        "var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;" +
        "dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';" +
        "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);" +
        "})();"
    return (
      <div>
        <div id="disqus_thread" />
        <script
          dangerouslySetInnerHTML={{
            __html: scriptContent
          }}
        />
      </div>
    );
  }
});



    
        