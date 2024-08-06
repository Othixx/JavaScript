# JavaScript 学习指南

说明：本文章内容学习自https://www.bilibili.com/video/BV1Y84y1L7Nn/ 以及 https://liaoxuefeng.com/books/javascript/ 。

这份学习指南主要是在我学习过程中进行的查漏补缺。它不是面向新手的。

## 1 JS 基础知识

### JS 的书写位置

内部、外部、行内

### 注意事项

书写位置尽量放在`</body>`前面，同时外部js标签中间不要写代码，否则会被忽略

JS根据团队要求选择是否省略行末分号

### JS输入输出

`prompt()`函数用于输入，`alert()`函数用于输出，`console.log()`函数用于控制台输出

`alert()`和`prompt()`会跳过页面渲染先被执行。

### 变量声明

提倡一行只声明一个变量。提倡更多的使用let来声明变量。

# 2 函数

## 2.1 “方法”中的`apply`与`call`

JS中的`this`经常会出现指代不明。虽然在一个独立的函数调用中，根据是否是strict模式，this指向undefined或window，不过，我们还是可以控制this的指向的！

要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。

```javascript
function getAge() {
    let y = new Date().getFullYear();
    return y - this.birth;
}

let xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
```

另一个与apply()类似的方法是call()，唯一区别是：

apply()把参数打包成Array再传入；

call()把参数按顺序传入。

```javascript
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```

## 2.2 高阶函数

**所谓高阶函数，是指一个函数里可以传入另一个函数作为参数。**

### 2.2.1 map 与 reduce

一般而言，这两个函数作用于数组。先看map的用法。上例子：

```javascript
function pow(x) {
    return x * x;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(results);
```

map()函数里面传入另一个函数参数，传入的函数表示我要干什么。例如上面这个pow就表示了我要让每个数字乘方。

再看reduce的用法：

```javascript
[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)    // 定义
let arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x + y;
}); // 25
```

## 2.3 `Array`的一些常用方法

`Array`是数组对象。

`find()`返回找到的第一个元素

`findIndex()`返回找到的第一个元素索引

`forEach()`循环：它其实和`map`很像。它的作用是对数组的每个元素执行一次给定的函数：

```javascript
const array1 = ['a', 'b', 'c'];
array1.forEach((element) => console.log(element));
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

## 2.4 参数传递方式

JavaScript 中所有函数传递都是按值传递的，不会按引用传递。所谓的值，就是指直接保存在变量上的值，如果把对象作为参数传递，那么这个值就是这个对象的引用，而不是对象本身。这里实际上是一个隐式的赋值过程，所以给函数传递参数时，相当于从一个变量赋值到另一个变量。JS没有指针！！！

原始值：

```javascript
function add(num) {
    return num + 1;
}

let count = 5;
let result = add(count); // 此处参数传递的过程可以看作是 num = count

console.log(count); // 5
console.log(result); // 6
```

引用值（对象）：

```javascript
function setName(obj) {
    obj.name = "小明";
}

let person = {};

setName(person); // 此处参数传递的过程可以看作是 obj = person;
console.log(person); // {name: "小明"}
```

好好学习上面两个例子。应该避免在方法中尝试修改原来传入参数的值。

# 3 标准对象

## 3.1 RegExp

`RegExp`是正则表达式对象。`RE`的`test`方法用于测试字符串是否符合条件。

要匹配变长的字符，在正则表达式中，用`·`表示任意个字符（包括0个），用`+`表示至少一个字符，用`?`表示0个或1个字符，用`{n}`表示n个字符，用`{n,m}`表示n-m个字符。

`^`表示行的开头，`^\d`表示必须以数字开头。

`$`表示行的结束，`\d$`表示必须以数字结束。

**至于怎么写出好的正则，可以查阅网络。资深程序员写正则可能也需要边写边调。**

```javascript
let re1 = /ABC\-001/;
let re2 = new RegExp('ABC\\-001');

re1.test('ABC-001'); // true
re1.test('ABC-0012');   // true
re2.test('ABC-001'); // true
```

注意，如果使用第二种写法，因为字符串的转义问题，字符串的两个`\\`实际上是一个`\`。

为什么第二个`test`也是`true`呢？在JavaScript中，正则表达式匹配并不是简单地检查正则表达式是否“存在于”字符串中，而是检查字符串是否符合正则表达式定义的模式。正则表达式通过一系列特定的字符和模式来定义字符串的规则，如果字符串中的某个部分满足这些规则，那么就可以认为这个字符串与正则表达式匹配。

例如，正则表达式`/abc/`将会匹配包含连续"abc"序列的任何字符串，如"Hello, I am abc."。但如果使用`/^abc/`，则表示字符串必须以"abc"开始才能匹配；使用`/abc$/`则表示字符串必须以"abc"结束才能匹配。

### 切分字符串

请看下面这个例子：

```javascript
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
```

很灵活的。

### 贪婪匹配