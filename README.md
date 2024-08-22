# 2024.8.21
 
## 1 async/await

async和await的引入是为了可以用同步编程的方式去写异步代码。

### 1.1 async
- 函数的返回值为 promise 对象，**永远返回`Promise`**
- promise 对象的结果由 async 函数执行的返回值决定

**一个`async`简单例子：**

```javascript
async function bb(){
  return '别bb，专心学习';
}

bb().then(value =>{
  console.log(value);   // "别bb，专心学习"
});
```

简单分析下，`bb()`函数返回的是一个Promise对象，因为这里我们返回一个字符串，可以默认认为是返回了一个Promise对象，这个Promise对象执行了`resolve('别bb，专心学习')`命令，是一个`fullfilled`的对象。接着第二段代码在执行的过程中就把value传了过去打印。

### 1.2 await 表达式
- await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
- 如果表达式是 promise 对象, await 返回的是 promise 成功的值
- 如果表达式是其它值, 直接将此值作为 await 的返回值

**注意：`await`不能单独使用，它一定要和`async`一起使用。**

**同时，`await`与`Promise`往往一起使用，如果没搞懂不要乱用`await`。**

**一个`await`的简单例子：**

```javascript
async function bb(){
  console.log('1');
  let two = await Promise.resolve('2');
  console.log(two);
  console.log('3');
  return Promise.resolve('别bb，专心学习');
}

bb().then(value => {
  console.log(value);
});
```

**分析：**

这段代码定义了一个异步函数 `bb`，并且在函数的最后返回了一个通过 `Promise.resolve` 封装的字符串 `'别bb，专心学习'`。下面是代码的执行流程：

1. 调用异步函数 `bb`。
2. 执行到 `console.log('1')`，输出 `'1'`。
3. 执行 `await Promise.resolve('2')`。由于 `await` 会等待 `Promise` 完成，这里的 `Promise.resolve('2')` 会立即解决（resolved），因此 `await` 会暂停 `bb` 函数的执行，直到 `Promise` 被解决，然后变量 `two` 被赋值为 `'2'`。
4. 继续执行，输出 `two` 的值，即 `'2'`。
5. 再次输出 `'3'`。
6. 函数执行到返回 `Promise.resolve('别bb，专心学习')`。这里的 `Promise` 会立即解决，但返回的是一个 `Promise` 对象。
7. 由于 `bb` 函数是异步的，它返回的是一个 `Promise` 对象，这个 `Promise` 对象会等待 `bb` 函数内部的所有操作完成。
8. 调用 `bb()` 后，使用 `.then()` 方法来添加一个回调函数，这个回调函数将在 `bb` 返回的 `Promise` 解决后执行。
9. 当 `bb` 函数返回的 `Promise` 解决时，`.then()` 方法中的回调函数被调用，输出传递给 `resolve` 的值，即 `'别bb，专心学习'`。

打印结果：

```javascript
"1"
"2"
"3"
"别bb，专心学习"
```

### 1.3 async和await结合（这个感觉在上面这个例子中已经讲到了）
示例
```javascript
const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);

async function main() {
  try {
    let data1 = await mineReadFile("./resource/1.html");
    let data2 = await mineReadFile("./resource/2.html");
    let data3 = await mineReadFile("./resource/3.html");
  } catch(e) {
    console.log(e);
  }
}
```

## 2 深浅拷贝

**二者的区别：浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址。**

**一般而言，对象存在堆中，栈中存储基本数据类型的值和某些指向堆的地址。**

### 2.1 一个浅拷贝的简单例子

```javascript
let a = [1, 2, 3, [3, 4]];
let b = [...a];
a[3][1] = 5;
a[1] = 6;
console.log(a);   // [1, 6, 3, [3, 5]]
console.log(b);   // [1, 2, 3, [3, 5]]，6是基本对象，拷贝值；[3, 4]是引用类型对象，拷贝的是[3, 4]这个数组对象的地址
```

**浅拷贝只拷贝一层，但是，如果我把代码的第二行写成：**

```javascript
let b = a;
```

这样子就不行了，这样子我打印b的时候，数组b的第二项也会变成6，因为它没有涉及拷贝的。它只复制了地址。

### 2.2 深拷贝

就是不管多少层都给你开栈拷贝下去。

看下面一个使用`JSON.stringify()`实现深拷贝的方式：

```javascript
const obj2 = JSON.parse(JSON.stringify(obj1));
```

可以说这是最简单实现深拷贝的方式了。**但是这种方式它有一个弊端，就是它不能拷贝对象中存在函数的情况。**

### 2.3 面试题：实现一个深拷贝（重要）

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);    // 这句话是为了避免循环拷贝，如果自己引用自己的话，后面会递归拷贝下去，导致出现死循环。
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);    // 这里的hash传的栈的内存地址，因此添加直接添加在原来的hash上。
    }
  }
  return cloneObj;
}
```

# 2024.8.20

# 1 Promise/async/await

JS是一门单线程的编程语言，它的所有程序都运行在同一个线程中。**好处就是它能减少线程内存开销以及线程切换开销。**

Promise是一种处理异步代码，而不会陷入回调地狱的方式。**它解决了前端程序员的“回调地狱”问题。**

# 视频: https://www.bilibili.com/video/BV1454y1R7vj?p=10

视频作者: 杰哥课堂(B站)

## 1.1 为什么需要Promise
- **需求**
  通过AJAX请求id ,再根据id请求用户名.再根据用户名,再根据用户名获取email
- **回调地狱**
  回调函数中嵌套回调
  Promise解决了回调地狱

## 1.2 Promise 的基本使用
### 语法
```javascript
new Promise((resolve, reject) => {})
```
- Promise接受一个函数作为参数
- 在参数函数中有两个参数
  - `resolve`: 成功函数
  - `reject`: 失败函数

### Promise实例
Promise实例有两个属性
- `state`: 状态
- `result`: 结果

#### 1) Promise的状态
- 第一种状态: `pending`
- 第二种状态: `fulfilled`
- 第三种状态: `rejected`

#### 2) Promise状态的改变
示例1
```javascript
const p = new Promise((resolve, reject) => {
  resolve();
});
console.dir(p); // fulfilled
```
示例2
```javascript
const p = new Promise((resolve, reject) => {
  reject();
});
console.dir(p);
```
- `resolve()`: 调用函数, 使当前Promise对象的状态改成`fulfilled`
- `reject()`: 调用函数,使当前Promise对象状态改成`rejected`
Promise状态的改变是一次性的

#### 3) Promise 的结果
示例
```javascript
const p = new Promise((resolve, reject) => {
  resolve("成功的结果");
});
console.dir(p);
```

### 1.3 Promise的方法
#### 1) then方法
示例1
```javascript
const p = new Promise((resolve, reject) => {
  reject("失败的结果");
});

p.then(() => {
  console.log("成功的回调");
}, () => {
  console.log("失败时调用");
});
```
示例2
```javascript
const p = new Promise((resolve, reject) => {
  reject("失败的结果");
});

p.then((value) => {
  console.log("成功的回调", value);
}, (err) => {
  console.log("失败时调用", err);
});
```
- 在then方法的参数函数中,通过形参使用Promise对象的结果
- `then`方法返回一个新的Promise实例,状态是`pending`

#### 2) catch方法
示例
```javascript
const p = new Promise((resolve, reject) => {
  throw new Error("出错了");
});

p.catch((reason) => {
  console.log("失败", reason);
});
```

### 1.4 优化代码
示例
```javascript
function getData(url, data = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: url,
      data: data,
      success: function (res) {
        resolve(res);
      },
      error: function (res) {
        reject(res);
      }
    });
  });
}

getData("data1.json")
  .then((data) => {
    const { id } = data;
    return getData("data2.json", {id});
  })
  .then((data) => {
    const { usename } = data;
    return getData("data3.json", {usename});
  })
  .then((data) => {
    console.log(data);
  });
```

## 1.5 async和await
- 视频链接: [async与await结合发送AJAX请求](https://www.bilibili.com/video/BV1GA411x7z1?p=46&spm_id_from=pageDriver)
- 视频作者: 尚硅谷-李强(B站)

#### 1) async 函数
- 函数的返回值为 promise 对象
- promise 对象的结果由 async 函数执行的返回值决定

#### 2) await 表达式
- await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
- 如果表达式是 promise 对象, await 返回的是 promise 成功的值
- 如果表达式是其它值, 直接将此值作为 await 的返回值

#### 3) async和await结合
示例
```javascript
const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);

async function main() {
  try {
    let data1 = await mineReadFile("./resource/1.html");
    let data2 = await mineReadFile("./resource/2.html");
    let data3 = await mineReadFile("./resource/3.html");
  } catch(e) {
    console.log(e);
  }
}
```

## 面试题：如何实现一个Promise？

待补充。

# 2024.8.19

## 1 对象与原型继承

对象是什么东西？对象就是`{...}`这种东西。

### 1.1 创建对象

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

### 1.2 对象原型 原型对象

![prototype](imgs/prototype.png)

`__proto__` 是对象的原型，它指向原型对象`prototype`。`实例对象.__proto__.constructor`指向实例对象的构造函数。它们的关系如上图。

### 1.3 原型继承

请看下面的代码。

```javascript
// Person 类，构造函数，它实际上就是声明一个对象（类），new出来的对象结构一样，但是对象不一样
function Person() {
    this.eyes = 2
    this.head = 1
}

// Woman 类
function Woman(){

}

// Woman 通过原型来继承Person
Woman.prototype = new Person()
// 如果这样子定义, Woman的构造函数就会不对
// 需要指回原来的构造函数
Woman.prototype.constructor = Woman

// 给女人添加一个方法——生孩子
Woman.prototype.baby = function(){
    console.log('宝贝')
}

const red = new Woman()
console.log(red)

function Man(){

}
Man.prototype = new Person()
Man.prototype.constructor = Man
```

### 面试题：如何利用原型实现继承？

答案见上面1.3部分

## 2 Promise/async/await

JS是一门单线程的编程语言，它的所有程序都运行在同一个线程中。**好处就是它能减少线程内存开销以及线程切换开销。**

Promise是一种处理异步代码，而不会陷入回调地狱的方式。

### 面试题 手写Promise

# 2024.8.18

## 1 执行上下文

用自己的话说，执行上下文就是函数执行时的环境。在函数执行时，会创建一个执行上下文，用来存储函数的参数、局部变量、`this`指向等信息。**JS执行到一个函数时，就会进行准备工作，用一个更专业的说法就是“创建执行上下文”。**

每个执行上下文，都有三个重要属性：①变量对象、②作用域链、③this。

### 1.1 执行上下文栈

JS引擎会创建一个执行上下文栈（Execution Context Stack，ECS）来管理执行上下文。栈底永远是**全局执行上下文**，栈顶是当前执行的函数的执行上下文。

```javascript
var scope = "global scope";

function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}

var result = checkscope()();
console.log(result);    // local scope
```

问题：尝试对上面的代码分析执行上下文栈的变化？

### 1.2 变量对象

变量对象是执行上下文中的一个数据结构，用来存储上下文中定义的变量和函数声明。

![variableObject](./imgs/variableObject.png)

**在浏览器环境中，全局对象是window对象。它包含了浏览器窗口的所有属性和方法。**

看下面这个例子：

![img1](./imgs/img1.png)

分析：第一段代码，会打印“a未定义”说明，因为在第一段代码执行时，变量对象中没有`a`这个变量。第二段代码，会打印`a`的值，因为在第二段代码执行时，变量对象(window)中有`a`这个变量。**注意第二段代码，如果变量前未加let/var，那么它将被定义为全局变量，被定义在全局上下文中。**

### 1.3 作用域链

作用域链是一个指向变量对象的指针列表，它保证了执行上下文中的变量对象能够有序访问。

简单说，在当前函数的执行上下文上找不到的变量，就会沿着作用域链向上查找，直到找到全局执行上下文为止。

### 1.4 闭包

闭包 = 内层函数 + 引用的外层函数变量

### 1.5 this

this是普通函数的自由变量。箭头函数没有this。大多数情况只需要记住：1.在浏览器中全局的this指向window。2.谁调用的函数，函数中的this指向谁。**3.在箭头函数中不存在this。它沿用上一级的this，至于怎么查找，向外层作用域中，一层一层查找this，直到有this的定义。**

**执行上下文在创建的同时，this的指向被确定。**

## 2 this的进阶（改变this的指向）

### 2.1 call

这家伙的地位最低，使用场景相对比较少。

使用方法是：`fun.call(thisArg, arg1, arg2, ...)
`

`call`有两个作用：①调用函数，②改变this的指向。

其中，`thisArg`是函数执行时的`this`的指向，`arg1, arg2, ...`是函数的参数。函数的返回值是被调用函数的返回值。

### 2.2 apply

这家伙比`call`的使用场景要多一些。一个很好的场景是，求数组的最大值。

使用方法是：`fun.call(thisArg, arg1, arg2, ...)
`

同样，`apply`也有两个作用：①调用函数，②改变this的指向。**只不过，`apply`的参数是一个数组。** 函数的返回值是被调用函数的返回值。

### 面试题：模拟实现`call`和`apply`方法

待补充

### 2.3 bind

最重要。

一个重要的场景是：**在事件监听中，改变this的指向。**

使用方法是：`fun.bind(thisArg, arg1, arg2, ...)
`

它的使用语法和`call`相似，但是它不会调用函数。它返回了一个原函数的拷贝，并且拷贝的函数的`this`指向`thisArg`。