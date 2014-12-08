---
title: React 学习笔记（二）：Getting Started
date: 2014-11-14
---

通过对 React 的[首页介绍][React Index]的学习，我们对 React 有了一个大致的了解，下面来到了 [Getting Started] 页面。

Hello World
---

再开始之前，要先要下载一个 [Starter Kit 0.12.0](http://facebook.github.io/react/downloads/react-0.12.0.zip)

下载解压完成后，可以看到目录结构如下（第三层太多了，就不打印出来了）：

```nohighlight
$ tree -L 2 react-0.12.0
react-0.12.0
├── README.md
├── build
│   ├── JSXTransformer.js
│   ├── react-with-addons.js
│   ├── react-with-addons.min.js
│   ├── react.js
│   └── react.min.js
└── examples
    ├── README.md
    ├── ballmer-peak
    ├── basic
    ├── basic-commonjs
    ├── basic-jsx
    ├── basic-jsx-external
    ├── basic-jsx-harmony
    ├── basic-jsx-precompile
    ├── jquery-bootstrap
    ├── jquery-mobile
    ├── requirejs
    ├── server-rendering
    ├── shared
    └── transitions
```

那么我们先来写一个 Hello World 吧，在 react-0.12.0 目录下创建一个 `helloworld.html` 文件：

```html
<!-- helloworld.html -->
<!DOCTYPE html>
<html>
  <head>
    <script src="build/react.js"></script>
    <script src="build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/jsx">
      React.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

之前已经了解了 JSX，这里可以看到写了 JSX 的 `script` 标签设置了 `type="text/jsx"` 了，这个的目的就是告诉浏览器，此标签内的内容需要用 JSXTransformer 才能解析。

HTML 和 js 分离
---

当然 js 是可以和 HTML 分离的，创建一个 `src/helloworld.js` 吧：

```javascript
// src/helloworld.js
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

然后把 `helloworld.html` 中的 `script` 标签改为以下即可：

```html
<script type="text/jsx" src="src/helloworld.js"></script>
```

预编译
---

之前了解过，在生产环境中使用 React，需要一个预编译过程，那么如何使用预编译工具呢？

首先需要安装 [react-tools]，安装方法如下（当然需要能使用 npm）：

```bash
npm install -g react-tools
```

然后使用以下命令将 `src/helloworld.js` 编译到 `build/helloworld.js` 中：

```bash
jsx --watch src/ build/
```

`--watch` 会使 `src` 目录下的任何修改都触发一次编译过程。

编译完之后，`build/helloworld.js` 内容就是这样了：

```javascript
React.render(
  React.createElement('h1', null, 'Hello, world!'),
  document.getElementById('example')
);
```

当然，我们的 `helloworld.html` 就再也不需要 JSXTransformer 了，`script` 标签也不需要 `type="text/jsx"` 了。

```html
<!-- helloworld.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <!-- No need for JSXTransformer! -->
  </head>
  <body>
    <div id="example"></div>
    <script src="build/helloworld.js"></script>
  </body>
</html>
```

虽然这个例子比较简单，不过我还是创建了一个 JSFiddle，大家可以看看效果：

<iframe width="100%" height="150" src="http://jsfiddle.net/xcatliu/omhnpx7q/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

CommonJS 版本的 React
---

想使用 CommonJS 版本的 React，使用 [react npm package] 即可。并且 JSX 编译工具还支持编译成其他类型的模块（支持哪些呢<sup>?</sup>）。

`examples` 目录下还有很多例子，感兴趣可以都看看。

小结
---

- 使用 JSX 的话，需要引入 `JSXTransformer.js`，且 `script` 标签需要添加 `type="text/jsx"`
- 使用 [react-tools] 进行预编译
- 编译完之后，就不需要 `JSXTransformer.js` 了，`script` 标签也不需要 `type="text/jsx"` 了
- 使用 [react npm package] 来将 react 作为 CommonJS 模块引入

Links
---

- [React Index]
- [Getting Started]
- [learning-react]
- [react-tools]
- [react npm package]
- [Tutorial]

[React Index]: http://facebook.github.io/react/index.html
[Getting Started]: http://facebook.github.io/react/docs/getting-started.html
[learning-react]: https://github.com/xcatliu/learning-react
[react-tools]: https://www.npmjs.org/package/react-tools
[react npm package]: https://www.npmjs.org/package/react
[Tutorial]: http://xcatliu.com/blog/learning-react-4-tutorial.html
