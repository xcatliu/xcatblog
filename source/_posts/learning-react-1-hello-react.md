---
title: React 学习笔记（一）：初识 React
date: 2014-11-13
---

React 是一个用于构建 UI 的 JavaScript 库，已经应用于 Facebook 和 Instargram。

初识 React
---

用官方的描述，React 有三大特性：

1. Just the UI
2. Virtual DOM
3. Data Flow

### Just the UI

React 只涉及 UI 层，也可以说是 MVC 中的 V。由于 React 只涉及 UI 层，所以可以和其他技术任意搭配。

### Virtual DOM

React 内部维护了一个*虚拟的 DOM 树*，每次更新 UI 的时候，都会在内部计算出性能最高（步骤最少<sup>？</sup>）的方法去更新文档。当然也可以运行在服务器端。

### Data Flow

React 实现了不同于数据绑定的数据流——单向反应性数据流<sup>？</sup>（one-way reactive data flow）

以上描述可能有一些没能理解，下面我们就来看看几个例子吧。

简单的组件
---

下面使用 React 来构建一个简单的组件。

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/9wre9yj7/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

React 使用 `React.createClass` 创建一个组件，然后使用 `React.render` 渲染到 DOM 节点上，让人眼前一亮的是，直接在 js 里面使用了没有带引号的 html 标签。

原来，这是一种类似 XML 的语法 JSX，关于 JSX 的介绍请点击：[JSX Specification]。

另一个需要注意的是，`createClass` 中的 `render` 方法里面通过 `{this.props.name}` 获取到了传入 `HelloMessage` 的 `name` 参数。其实，`{}` 类似与传统模板引擎的标志符，`this.props` 则包含所有引用组件时传入的参数。

JSX 本来是无法被浏览器解析的，在这个例子中，我们引入了以下三个资源：

- react-0.12.0.js
- JSXTransformer-0.12.0.js
- bootstrap.min.css

其中 JSXTransformer 即是使浏览器支持 JSX 的关键所在。但是在生产环境中，我们应该使用 React 提供的转换工具，[react-tools]，将 JSX 转换成 js，转换后的结果如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/65ycmb0L/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

运用状态的组件
---

接着来实现一个简单的计时器：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/cbprgdyj/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

通常，`{this.props}` 用来获取传入组件的参数，`{this.state}` 则用来管理组件内部的状态。状态的改变将触发 `render` 的调用，从而改变 UI。

这个例子中，`state` 是一个对象，看上去 `getInitialState` 相当于 `state` 的初始化，初始值是 `{secondsElapsed: 0}`。

然后在 `render` 中，会将 `this.state.secondsElapsed` 显示出来，但是没有看到其他地方调用 `componentDidMount` 呢，难道说 `componentDidMount` 也是 React 内置的一个 api 吗<a id="componentDidMount"></a><sup>[？](/blog/learning-react-3-tutorial.html#componentDidMount)</sup>`componentWillUnmount` 又会什么时候被调用吗？

此处没有给出解答，那我们就带着疑问继续学习吧。

一个小应用
---

运用 `props` 和 `state`，我们来实现一个简单的 TODO 应用：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/fecjzL92/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个例子中，我们使用 `state` 来管理 TODO items 和用户输入的内容，可以明显的看出来，它和 MVVM 框架的双向绑定不同，需要我们手动添加 `onChange` 和 `onSubmit` 事件，并且需要手动调用 `setState` 来更新状态。

不过 UI 的渲染则是随着 `state` 的改变自动完成的。有点理解 React 所谓的「单向数据流」了，那么这样会带来哪些好处呢？希望随着深入的学习，能够解开这个迷雾。

另一个需要注意的点是，虽然此处我们手动添加了 `onChange` 和 `onSubmit` 事件，但是实际上它们是通过事件代理的方式被捕获到的。

使用插件的组件
---

React 拓展性很强，可以与其他库或框架结合的很好，下面是一个 Markdown 编辑器的例子：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/nha9zpq8/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

`Showdown` 是一个解析 Markdown 的库，我们看到在 `render` 里面，也可以直接使用到外部定义的变量，不过有几个疑点还需要解释：

- React 使用 `chassName` 来给一个 DOM 节点添加 `class`？
- 使用 `refs` 来获取 DOM 节点吗？
- `dangerouslySetInnerHTML` 的作用是什么？
- `__html` 是必须的吗？

相信在后面的文档会对这些做出解释。

小结
---

- React 只涉及 UI 层
- React 内部维护了一个*虚拟的 DOM 树*
- React 实现了单向反应性数据流<sup>？</sup>
- 使用 React 开发时，可以使用 JSX 的语法，简化了代码
- 使用 JSX 需要引入 JSXTransformer，然而在生产环境需要转化成 js
- `{this.props}` 用来获取传入组件的参数
- `{this.state}` 用来管理组件内部的状态
- `{this.refs}` 用来获取使用 `ref` 标记的 DOM 节点
- `getInitialState` 用来初始化 `state`
- 需要手动添加事件，手动更新 `state`
- `setState` 用来改变 `state`
- `state` 的改变会触发 UI 的更新
- React 中可以直接使用外部库或框架

Links
---

- [React Index]
- [JSX Specification]
- [react-tools]

[React Index]: http://facebook.github.io/react/index.html
[JSX Specification]: http://facebook.github.io/jsx/
[react-tools]: https://www.npmjs.org/package/react-tools
