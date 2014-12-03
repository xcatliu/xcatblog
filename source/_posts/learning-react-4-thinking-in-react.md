---
title: React 学习笔记（四）：Thinking in React
date: 2014-11-23
---

这一节中，主要讲讲使用 React 开发一个组件的思路。

我们将要开发的是一个产品列表页：

![](/img/learning-react-4-thinking-in-react-mock.png)

后端传过来的数据是这样的：

```json
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]
```

### 第一步：拆分为小组件

![](/img/learning-react-4-thinking-in-react-components.png)

拿到设计稿和后端数据之后要做的第一件事，就是拆分组件，尽可能按照 UI 上的层级拆分，拆分完成后，我们会发现 UI 层级和组件层级是相互对应的。

- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow

### 第二步：开发一个静态版本

<iframe width="100%" height="300" src="http://jsfiddle.net/reactjs/yun1vgqb/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

开发静态版本需要注意的是，**不要用 state**，只需要用 props 来传递参数，此时单向数据流的优势就体现出来的，数据的流动非常清晰，也是按照层级的关系来流动的。

### 第三步：分析需要的最少量 state

### 第四步：分析 state 需要放到哪个组件中

### 第五步：构建数据流

小结
---

- 拆分组件时，UI 上的层级和组件的层级是一一对应的
- 

Links
---

1. [Thinking in React]

[Thinking in React]: http://facebook.github.io/react/docs/thinking-in-react.html
