---
title: React 学习笔记（三）：Tutorial
date: 2014-11-19
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
    <script src="http://fb.me/react-0.12.0.js"></script>
    <script src="http://fb.me/JSXTransformer-0.12.0.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/jsx" src="js/tutorial.js"></script>
  </body>
</html>
```

这里，我们需要用到 `jQuery` 实现发送 Ajax 请求。

```js
// js/tutorial.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);
```

以上创建了一个无交互的 html 页面，可以看到，组件之间需要引用时，不需要按照先定义后引用的顺序。

我们在使用 JSX 的时候，无需担心 JSX 中的变量解析出来的时候会生成 html 标签，因为 React 已经将标签都转义了，这也是有效防止 XSS 攻击的手段。

我们可以看看 JSFiddle 中的效果：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/45t3zbh7/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

`this.props.children` 可以获取到引用组件时组件的内容。

添加 Markdown 支持
---

为了添加 Markdown 支持，我们需要引入 Showdown 库：

```html
<!-- tutorial.html -->
<html>
  <head>
    <title>Hello React</title>
    <script src="http://fb.me/react-0.12.0.js"></script>
    <script src="http://fb.me/JSXTransformer-0.12.0.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/jsx" src="js/tutorial.js"></script>
  </body>
</html>
```

相应的 `Comment` 也要改过来：

```js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {converter.makeHtml(this.props.children.toString())}
      </div>
    );
  }
});
```

但是我们发现，html 内容被转义了：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/k81canab/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

要让 html 能正确的显示出来，需要做如下改动：

```js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup} } />
      </div>
    );
  }
});
```

Demo 如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/6oyuu35w/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

我们可以看到，已经能够正常的显示 html 了。

看来 `__html` 是 `dangerouslySetInnerHTML` 必须传入的属性了。

绑定数据
---

下面要做的就是把 object 数据在其中：

```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

Demo 如下：

小结
---

- 组件之间需要引用时，不需要按照先定义后引用的顺序
- 在使用 JSX 的时候，React 会转义 html 标签以防止 XSS 攻击
- `this.props.children` 可以获取到引用组件时组件的内容
- 使用 `dangerouslySetInnerHTML` 的 `__html` 属性来输出 html
- `{}` 中的内容会当作 `js` 执行，所以 `{{a:b}}` 就是一个 `object`

Links
---

- [Tutorial]
- [learning-react]

[Tutorial]: http://facebook.github.io/react/docs/tutorial.html
[learning-react]: https://github.com/xcatliu/learning-react
