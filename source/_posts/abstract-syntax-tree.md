---
title: 抽象语法树在 JavaScript 中的应用
date: 2014-09-07
categories: blog
---

抽象语法树是什么
----------------

> 在计算机科学中，抽象语法树（*abstract syntax tree* 或者缩写为 *AST*），或者语法树（*syntax tree*），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。<sup>[1][Wikipedia AST]</sup>

果然比较抽象，不如先看几个例子：

### 抽象语法树举例

```
foo = 'hello world';
/*
    +-------------+             
    |  assign(=)  |             
    +-------------+             
       X        X               
      X          X              
+-------+    +-----------------+
|  foo  |    |  'hello world'  |
+-------+    +-----------------+
*/
```

```
if (foo === true) {
  bar = 'hello world';
  alert(bar);
}
/*
                       +------+                                    
                       |  if  |                                    
                       +------+                                    
                        X    X                                     
                      X        X                                   
         +--------------+    +-------------+                       
         |  equal(===)  |    |  if_body    |                       
         +--------------+    +-------------+                       
         X        X              X         X                       
       X         X                X          X                     
+-------+   +--------+    +-------------+   +------------+         
|  foo  |   |  true  |    |  assign(=)  |   |  alert()   |         
+-------+   +--------+    +-------------+   +------------+         
                             X        X                  X         
                           X            X                  X       
                       +-------+   +-----------------+    +-------+
                       |  bar  |   |  'hello world'  |    |  bar  |
                       +-------+   +-----------------+    +-------+
*/
```

从上述两个例子可以看出，抽象语法树是将源代码根据其语法结构，省略一些细节（比如括号没有生成节点），抽象成树形表达。

抽象语法树在计算机科学中有很多应用，比如编译器，IDE，压缩优化代码等。下面介绍一下抽象语法树在 JavaScript 中的应用。

JavaScript 抽象语法树
---------------------

构造 JavaScript 抽象语法树有多种工具，比如 [v8](https://code.google.com/p/v8/source/browse/branches/bleeding_edge/src/ast.h)、[SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)、[UglifyJS](http://lisperator.net/uglifyjs/ast) 等，这里重点介绍 UglifyJS。

### UglifyJS

UglifyJS 是使用最广的 JavaScript 压缩工具之一，而且是用 JavaScript 写的，使用它的方法很简单：

首先全局安装：

```
npm install -g uglify-js
```

然后就可以使用了：

```
uglifyjs -m srcFileName.js -o destFileName.min.js
```

关于 UglifyJS 的用法这里就不多介绍了，我们要做的是一些更有趣的事情。

### UglifyJS Tools

UglifyJS 提供了一些工具用于分析 JavaScript 代码，包括：

- parser，把 JavaScript 代码解析成抽象语法树
- code generator，通过抽象语法树生成代码
- mangler，混淆 JavaScript 代码
- scope analyzer，分析变量定义的工具
- tree walker，遍历树节点
- tree transformer，改变树节点

### 生成抽象语法树

使用 UglifyJS 生成抽象语法树很简单：

首先安装 UglifyJS 为 npm 包：

```
npm install uglify-js --save-dev
```

然后使用 parse 方法即可：

```
var UglifyJS = require('uglify-js');

var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
```

这样生成的 ast 即为那一段代码的抽象语法树。那么我们怎么使用呢？

### 使用 mangler 压缩代码

使用 mangler 可以将通过将局部变量都缩短成一个字符来压缩代码。

```
var UglifyJS = require('uglify-js');

var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
ast.figure_out_scope();
ast.mangle_names();
console.log(ast.print_to_string());
// function sum(a,b){return a+b}
```

### 使用 walker 遍历抽象语法树

使用 walker 可以遍历抽象语法树，这种遍历是深度遍历。

```
var UglifyJS = require('uglify-js');

var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
ast.figure_out_scope();
ast.walk(new UglifyJS.TreeWalker(function(node) {
    console.log(node.__proto__.TYPE + ': ' + node.print_to_string());
}));
/*
function sum(foo,bar){return foo+bar}
function sum(foo,bar){return foo+bar}
sum
foo
bar
return foo+bar
foo+bar
foo
bar
*/
```

UglifyJS 已经提供了直接压缩代码的脚本，walker 看上去貌似也没啥用，这些工具有什么使用场景呢？

抽象语法树应用
--------------

假如我们有重构 JavaScript 的需求，它们就派上用场啦。

下面考虑这样一个需求：

我们知道，`parseInt` 用于将字符串变成整数，但是它有第二个参数，表示以几进制识别字符串，若没有传第二个参数，则会自行判断，比如：

```
parseInt('10.23');     // 10            转换成正整数
parseInt('10abc');     // 10            忽略其他字符
parseInt('10', 10);    // 10            转换成十进制
parseInt('10', 2);     // 2             转换成二进制
parseInt('0123');      // 83 or 123     不同浏览器不一样，低版本浏览器会转换成八进制
parseInt('0x11');      // 17            转换成十六进制
```

因为有一些情况是和我们预期不同的，所以建议任何时候都加上第二个参数。

下面希望有一个程序，查看所有 parseInt 有没有第二个参数，没有的话加个参数 10，表示以十进制识别字符串。

使用 UglifyJS 可以实现此功能：

```
#! /usr/bin/env node

var U2 = require("uglify-js");

function replace_parseint(code) {
    var ast = U2.parse(code);
    // accumulate `parseIng()` nodes in this array
    var parseint_nodes = [];
    ast.walk(new U2.TreeWalker(function(node){
        if (node instanceof U2.AST_Call
            && node.expression.print_to_string() === 'parseInt'
            && node.args.length === 1) {
            parseint_nodes.push(node);
        }
    }));
    // now go through the nodes backwards and replace code
    for (var i = parseint_nodes.length; --i >= 0;) {
        var node = parseint_nodes[i];
        var start_pos = node.start.pos;
        var end_pos = node.end.endpos;
        node.args.push(new U2.AST_Number({
            value: 10
        }));
        var replacement = node.print_to_string({ beautify: true });
        code = splice_string(code, start_pos, end_pos, replacement);
    }
    return code;
}

function splice_string(str, begin, end, replacement) {
    return str.substr(0, begin) + replacement + str.substr(end);
}

// test it

function test() {
    if (foo) {
      parseInt('12342');
    }
    parseInt('0012', 3);
}

console.log(replace_parseint(test.toString()));

/*
function test() {
    if (foo) {
      parseInt("12342", 10);
    }
    parseInt('0012', 3);
}
*/
```

Reference
---------

1. [Wikipedia AST]


[Wikipedia AST]: http://en.wikipedia.org/wiki/Abstract_syntax_tree

