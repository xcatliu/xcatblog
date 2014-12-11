var matchFrontMatter = /---\n([\s\S]*?)\n---\n([\s\S]*)/;
var yaml = require('js-yaml');
var _ = require('lodash');

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

module.exports = function(fileContent) {
  var matchFrontMatterResult = matchFrontMatter.exec(fileContent.trim());
  var frontMatterContent = matchFrontMatterResult[1].trim();
  var frontMatter = yaml.load(frontMatterContent);
  var content = matchFrontMatterResult[2].trim();
  var contentHTML = marked(content);
  return _.merge(frontMatter, {
    frontMatter: frontMatter,
    content: content,
    contentHTML: contentHTML
  });
};