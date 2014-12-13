var fs = require('fs');
var path = require('path');

/**
 * Use marked and highlight.js parse Markdown
 * https://github.com/isagalaev/highlight.js/issues/578
 */
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

// Catch Front Matter string by RegExp
var matchFrontMatter = /---\n([\s\S]*?)\n---\n([\s\S]*)/;

// Use js-yaml to parse Front Matter
var yaml = require('js-yaml');

module.exports = function(fileName) {
  var config = this.config;
  var fileContent = fs.readFileSync(path.join(config.posts_dir, fileName)).toString();
  // `fileName` is `id`
  var id = path.basename(fileName, '.md');
  var url = config.site_url_api + '/posts/' + id;
  var html_url = config.site_url + '/posts/' + id + '.html';
  var frontMatter = {};
  var contentHTML = '';
  // RegExp is an error-prone area, so do it carefully
  var matchFrontMatterResult = matchFrontMatter.exec(fileContent.trim());
  if (matchFrontMatterResult !== null) {
    if (typeof matchFrontMatterResult[1] !== 'undefined') {
      frontMatter = yaml.load(matchFrontMatterResult[1].trim());
    }
    if (typeof matchFrontMatterResult[2] !== 'undefined') {
      contentHTML = marked(matchFrontMatterResult[2].trim());
    }
  }
  return {
    id: id,
    url: config.site_url_api + '/posts/' + id,
    html_url: config.site_url + '/posts/' + id + '.html',
    frontMatter: frontMatter,
    contentHTML: contentHTML
  };
};