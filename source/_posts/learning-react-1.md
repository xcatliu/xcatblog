---
title: React 学习笔记一：初识 React
date: 2014-11-08
---

React 是一个用于构建 UI 的 JavaScript 库，已经应用于 Facebook 和 Instargram。本系列是我学习 React 的笔记，与大家分享。

注意：

- 本系列适合有较好 JavaScript 基础，并对 MVC 或 MVVM 有一定了解的读者
- <sup>？</sup>表示存疑的部分，欢迎大家给出解释
- React 版本 0.12.0

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

尽管以上描述有一些没能理解，但是我们还是先来看一个例子吧。

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

其中 JSXTransformer 即是使浏览器支持 JSX 的关键所在。但是在生产环境中，我们应该使用 React 提供的转换工具，[react-tools](https://www.npmjs.org/package/react-tools)，将 JSX 转换成 js，转换后的结果如下：

<iframe width="100%" height="300" src="http://jsfiddle.net/xcatliu/9wre9yj7/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

小结
---

- React 只涉及 UI 层
- React 内部维护了一个*虚拟的 DOM 树*
- React 实现了单向反应性数据流<sup>？</sup>
- 使用 React 开发时，可以使用 JSX 的语法，简化了代码
- 使用 JSX 需要引入 JSXTransformer，然而在生产环境需要转化成 js
- 组件的参数可以通过 `{this.props}` 取到

Links
---

- [React Index](http://facebook.github.io/react/index.html)
- [JSX Specification]

[JSX Specification]: http://facebook.github.io/jsx/
