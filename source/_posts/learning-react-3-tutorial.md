---
title: React 学习笔记（三）：Tutorial
date: 2014-11-15
---

这一节中，我们将通过一个完整的例子，实现一个简单的评论系统。

评论系统
---

我们的评论系统大致的结构应该是这样的：

```
- CommentBox
  - CommentList
    - Comment
  - CommentForm
```

它会有以下特性：

- **预览评论**：发送的评论还没有提交到服务器之前，就会显示在评论列表中了
- **实时更新**：不需要刷新浏览器就会显示出最新的评论
- **支持 Markdown**：支持以 Markdown 格式发表评论

根据这个结构，我们可以先将其用 React 实现出来：

```html
<!-- tutorial.html -->
<html>
    <head>
        <title>Hello React</title>
        <script src="js/react.js"></script>
        <script src="js/JSXTransformer.js"></script>
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/showdown.min.js"></script>
    </head>
    <body>
        <div id="content"></div>
        <script type="text/jsx" src="js/tutorial.js"></script>
    </body>
</html>
```

这里，我们需要用到 `jQuery` 实现 Ajax，需要用到 `showdown` 实现解析 Markdown。

```js
// js/tutorial.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);
```

小结
---

- 组件之间需要引用时，不需要按照先定义后引用的顺序

Links
---

- [Tutorial]
- [learning-react]

[Tutorial]: http://facebook.github.io/react/docs/tutorial.html
[learning-react]: https://github.com/xcatliu/learning-react
