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

{% raw %}
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
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});
```
{% endraw %}

Demo 如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/6oyuu35w/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

我们可以看到，已经能够正常的显示 html 了。

看来 `__html` 是 `dangerouslySetInnerHTML` 必须传入的属性了。

绑定数据
---

下面要做的就是把数据融入渲染的过程中，我们先用一个人造的数据入手：

```js
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
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

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/0f6dk9ff/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

`data` 从 `CommentBox` 传到了 `CommentList` 中，不禁想到，如果遇到复杂的业务场景，会不会一级一级的传下去导致维护困难呢<sup>？</sup>

从服务器获取评论
---

下一步就是把人造的数据用服务器的数据替换掉：

```js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
```

想要实时更新 UI，我们可以用 `state` 来存储数据，每次 `state` 改变的时候，都会重新调用一次 `render`，`state` 的改变需要调用 `this.getState` 方法（而不是给 `this.state` 赋值）。

componentDidMount 方法是 react 内置的方法，它会在组件 render 完成后被调用。总算解开了之前的<a id="componentDidMount"></a>[疑问](/blog/learning-react-1-hello-react.html#componentDidMount)。

这个例子中，我们的实现实时更新的方式是每两秒向服务器发送一个请求获取评论数据，这种方式的优点是简单易理解，此处只是作为例子使用。在实际项目中应该会使用其他保持长连接的方式（WebSocket 等）。

Demo 如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/8ywLhrub/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

发送到 `/echo/json` 来模拟 Ajax 请求

提交评论
---

接下来需要实现评论功能了：

```js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

首先，我们给评论表单添加了一个 `onSubmit` 事件，然后在 `this.handleSubmit` 中对它进行监听，阻止默认事件，检测非法值，清空表单，然后把数据传递给传入 `CommentForm` 的参数 `onCommentSubmit`。

`CommentBox` 监听到了 `onCommentSubmit` 事件之后，会调用 `handleCommentSubmit`，为了提高用户体验，我们在数据真正提交之前就已经显示在评论中了。

在 `props` 中传递函数，是实现事件监听的常用方法。

Demo 如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/kw0ge8nf/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

由于请求的数据始终没有变，所以提交之后下次刷新就会恢复成只有一条评论的状态了。

至此，我们已经学习了 react 的核心方法，它就是靠这么几个简单的 api，支撑起了强大的功能。再复习一下它的三个特点：

1. Just the UI
2. Virtual DOM
3. Data Flow

小结
---

- 组件之间需要引用时，不需要按照先定义后引用的顺序
- 在使用 JSX 的时候，React 会转义 html 标签以防止 XSS 攻击
- `this.props.children` 可以获取到引用组件时组件的内容
- 使用 `dangerouslySetInnerHTML` 的 `__html` 属性来输出 html
{% raw %}
- `{}` 中的内容会当作 `js` 执行，所以 `{{a:b}}` 就是一个 `object`
{% endraw %}
- `props` 是不可改变的，`state` 是可改变的
- 改变 `state` 使用 `this.setState({data: xxx})` 方法，而不是 `this.state.data = xxx`
- 在 `props` 中传递函数，是实现事件监听的常用方法

Links
---

- [Tutorial]
- [learning-react]

[Tutorial]: http://facebook.github.io/react/docs/tutorial.html
[learning-react]: https://github.com/xcatliu/learning-react
