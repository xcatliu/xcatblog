---
title: React 学习笔记二：三个示例
date: 2014-11-13
---

上一节已经看到了一个简单的示例，这一节中，我们将再看到三个示例，它们均取自 React 的[首页介绍][React Index]中。

运用状态的组件
---

我们首先来实现一个简单的计时器：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/cbprgdyj/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

通常，`{this.props}` 用来获取传入组件的参数，`{this.state}` 则用来管理组件内部的状态。状态的改变将触发 `render` 的调用，从而改变 UI。

这个例子中，`state` 是一个对象，看上去 `getInitialState` 相当于 `state` 的初始化，初始值是 `{secondsElapsed: 0}`。然后在 `render` 中，会将 `this.state.secondsElapsed` 显示出来，但是没有看到其他地方调用 `componentDidMount` 呢，难道说 `componentDidMount` 也是 React 内置的一个 api 吗？`componentWillUnmount` 又会什么时候被调用吗？

此处没有给出解答，那我们就带着疑问继续学习吧。

一个小应用
---

运用 `props` 和 `state`，我们来实现一个简单的 TODO 应用：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/fecjzL92/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个例子中，我们使用 `state` 来管理 TODO items 和用户输入的内容，可以明显的看出来，它和 MVVM 框架的双向绑定不同，需要我们手动添加 `onChange` 和 `onSubmit` 事件，并且需要手动调用 `setState` 来更新状态，不过 UI 的渲染则是随着 `state` 的改变自动完成的。有点理解 React 所谓的「单向数据流」了，不过这样会带来哪些好处呢？希望随着深入的学习，能够解开这个迷雾。

另一个需要注意的点是，虽然此处我们手动添加了 onChange 和 onSubmit 事件，但是实际上它们是通过事件代理的方式被捕获到的。

使用插件的组件
---

React 拓展性很强，可以与其他库或框架结合的很好，下面是一个 markdown 编辑器的例子：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/nha9zpq8/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Showdown 是一个解析 markdown 的库，可以看到在 render 里面，也可以直接使用到外部定义的变量，不过有几个疑点还需要解释：

- React 使用 `chassName` 来给一个 DOM 节点添加 `class`？
- 使用 `refs` 来获取 DOM 节点吗？
- `dangerouslySetInnerHTML` 的作用是什么？
- `__html` 是必须的吗？

相信在后面的文档会对这些做出解释。

小结
---

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

[React Index]: http://facebook.github.io/react/index.html