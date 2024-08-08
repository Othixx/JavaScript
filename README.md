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

## 2.5 标签函数

标签函数是指在模板字符串中使用的函数。例如：

```javascript
let name = '小明';
let age = 20;

function myTag(strings, name, age) {
    console.log(strings[0]); // '这是'
    console.log(strings[1]); // '，今年'
    console.log(strings[2]); // '岁了'
    console.log(name); // '小明'
    console.log(age); // 20
    return 'OK';
}

let sentence = myTag`这是${name}，今年${age}岁了`;
console.log(sentence); // OK
```

标签函数的作用是对模板字符串进行处理。在这个例子中，`strings`是一个数组，它的成员是模板字符串中那些没有变量替换的部分，`name`和`age`则是模板字符串中的变量。标签函数可以对模板字符串进行处理，然后返回一个新的字符串。

注意：标签函数括号使用的是反引号，而不是小括号。

### 模板字符串

模板字符串是一种特殊的字符串，它可以定义多行字符串，也可以在字符串中插入变量。模板字符串使用反引号（`）标识。

```javascript
let name = '小明';
let age = 20;
let sentence = `你好，${name}，你今年${age}岁了！`;
console.log(sentence); // 你好，小明，你今年20岁了！
```

## 2.6 箭头函数

**要特别区分箭头函数和普通函数的`this`指向问题。** 箭头函数的`this`指向定义时的`this`，而不是调用时的`this`。

```javascript
let obj = {
    birth: 1990,
    getAge: function () {
        let b = this.birth; // 1990
        let fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};

console.log(obj.getAge()); // 30
```

在箭头函数中，`this`总是指向词法作用域，也就是外层调用者`obj`。这种特性非常有利于封装回调函数。

```javascript
let obj = {
    birth: 1990,
    getAge: function (year) {
        let b = this.birth; // 1990
        let fn = (y) => y - this.birth; // this指向obj对象
        return fn.call({birth: 2000}, year);
    }
};

console.log(obj.getAge(2015)); // 25
```

在这个例子中，`fn`内部的`this`指向`obj`对象，而`fn.call({birth: 2000}, year)`的`this`指向`birth: 2000`的对象，但是由于箭头函数的`this`总是指向词法作用域，所以`this.birth`仍然指向`obj`对象的`birth`属性。

## 2.7 闭包

## 2.8 生成器



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

## 3.2 JSON

把任何JavaScript对象变成JSON，就是把这个对象序列化成一个JSON格式的字符串，这样才能够通过网络传递给其他计算机。

如果我们收到一个JSON格式的字符串，只需要把它反序列化成一个JavaScript对象，就可以在JavaScript中直接使用这个对象了。

### JSON 对象的序列化和反序列化

通过`JSON.stringify()`把JavaScript对象序列化成JSON对象；通过`JSON.parse()`方法把JSON对象序列化成JavaScript对象。

# 4 对象

对象是什么东西？对象就是`{...}`这种东西。

## 4.1 创建对象

通过`let arr = [1, 2, 3];`创建一个Array对象，其原型链是：

```
       null
         ▲
         │
┌─────────────────┐
│Object.prototype │
└─────────────────┘
         ▲
         │
┌─────────────────┐
│ Array.prototype │
└─────────────────┘
         ▲
         │
┌─────────────────┐
│       arr       │
└─────────────────┘
```

其中，`Array.prototype`定义了很多方法，可以直接在对象上调用这些方法。比如`indexOf()` `pop()` 这一类数组方法。

## 4.2 对象原型 原型对象

![prototype](imgs/prototype.png)

`__proto__` 是对象的原型，它指向原型对象`prototype`。`实例对象.__proto__.constructor`指向实例对象的构造函数。它们的关系如上图。