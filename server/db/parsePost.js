var yaml = require('js-yaml');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var matchFrontMatter = /---\n([\s\S]*?)\n---\n([\s\S]*)/;

// https://github.com/isagalaev/highlight.js/issues/578
var marked = require('marked');
var hljs = require('highlight.js');
marked.setOptions({
  highlight: function(code, lang) {
    if (typeof lang === 'undefined') {
      return hljs.highlightAuto(code).value;
    } else if (lang === 'nohighlight') {
      return code;
    } else {
      return hljs.highlight(lang, code).value;
    }
  }
});

module.exports = function(fileName) {
  var config = this.config;
  var fileContent = fs.readFileSync(path.join(config.posts_dir, fileName)).toString();
  var id = path.basename(fileName, '.md');
  var matchFrontMatterResult = matchFrontMatter.exec(fileContent.trim());
  var frontMatterContent = matchFrontMatterResult[1].trim();
  var frontMatter = yaml.load(frontMatterContent);
  var content = matchFrontMatterResult[2].trim();
  var contentHTML = marked(content);
  return _.merge({
    id: id,
    url: config.site_url_api + '/posts/' + id,
    html_url: config.site_url + '/posts/' + id + '.html',
    frontMatter: frontMatter,
    contentHTML: contentHTML
  });
};