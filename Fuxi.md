# 2026.2.15

var let const 区别，①先要答出来var和let const的作用域不同，前者是函数作用域，或者全局作用域（当我们声明在全局时），后者是块级作用域；②然后要知道var会被提升，并且只提升声明，不提升赋值。最后还有最基础的，哪个是不能修改值的，哪个可以不必赋初始值（var可以稍后赋值）。此外我们还要知道，ES6前是没有let const的，只有var。

# 2026.3.1

数据基本、复杂类型的存储区别（要知道栈内存和堆内存）：

1. 基本类型：存储在**栈内存**中，值直接存储在变量中。
2. 复杂类型：存储在**堆内存**中，变量中存储的是指向堆内存中数据的引用。

拓展：栈内存和堆内存的区别：https://zhuanlan.zhihu.com/p/528715048 **简单来说，代码里看得见的在栈里，看不见的在堆里，堆一般比栈来的更大，也需要手动分配和回收。**（可以这么记：堆一堆一堆肯定更多，所以也就更大）

# 2026.3.7

作用域：有两种，分别是局部作用域（又包含块作用域{}和函数作用域）和全局作用域。var声明的变量在函数作用域和全局作用域中，也就是说如果它声明在函数里，那么只有函数内能访问，而如果声明在全局，那么所有地方都能访问，它不具有块级作用域。let const在块级作用域。

闭包：作用就是实现数据私有，而问题呢就是有可能导致内存泄漏，解决方法就是使用完之后及时将引用闭包的变量设置为null，这样垃圾回收机制就可以回收相关的内存。

![alt text](image-94.png)

**手写闭包**：

```javascript
function fn() {
  let count = 0
  return function () {
    count++
    console.log(count)
  }
}
const result = fn()
result() // 1
result() // 2
```

为啥会内存泄漏？上面的示例中result一直占用着fn里面的count资源不放，如果count是一个很大的数组，垃圾回收机制又回收不掉，那么显然就内存泄漏了。

箭头函数：关于箭头函数的基本语法就不用再讲了，说一下箭头函数没有arguments动态参数（不用任何定义，arguments就是每个函数都有的伪数组，专门用来接收参数的），但是有剩余参数（...args）。

关于箭头函数的this指向，它指向的是外部作用域的this，原因是箭头函数没有自己的this，它的this是继承而来的。另外我们需要注意的是，对象字面量是不产生作用域的。

关于更多的`this`指向，看下面的几个例子好好体会：

![alt text](image-106.png)
![alt text](image-107.png)
![alt text](image-108.png)
![alt text](image-109.png)
![alt text](image-110.png)
对最后一张图的理解：在对象方法中的箭头函数，`this`指向外部作用域，原因是**对象字面量不产生作用域**，所以最后一张图的`this`指向`window`，另外第二张图也可以用这个来解释，具体见：https://blog.csdn.net/2301_81854535/article/details/148829976

模板字符串：需要知道它就是用反引号``来定义的，它可以直接在字符串中插入变量，而不需要用加号拼接。

JS判断null的方法：

方法一就是使用严格相等运算符（===）来判断变量是否为null：

```javascript
let variable = null

if (variable === null) {
  console.log('变量是null')
} else {
  console.log('变量不是null')
}
```

方法二就是使用typeof运算符来判断变量是否为object，并且同时判断它是否等于null：

```javascript
let variable = null

if (typeof variable === 'object' && variable == null) {
  // 这里不需要再严格相等
  console.log('变量是null')
} else {
  console.log('变量不是null')
}
```

事实上，typeof null 会返回 'object'，这是一个历史遗留问题，因为在 JS 最初的实现中，null被错误的认为成了一个对象。

方法三，使用Object.is()方法来判断变量是否为null：

```javascript
let variable = null

if (Object.is(variable, null)) {
  console.log('变量是null')
} else {
  console.log('变量不是null')
}
```

# 2026.3.21

关于JS的==和===，只在下面给出几个例子去体会：

```javascript
console.log(1 == '1') // true
console.log(true == 1) // true
console.log(null == undefined) // true

console.log(1 === '1') // false
console.log(true === 1) // false
console.log(null === undefined) // false
console.log(1 === 1) // true
```

# 2026.3.22

今天看到CSS，最频繁的考点就是盒模型。盒模型又可以分成标准盒模型和怪异盒模型（IE盒模型）两种，它们的区别是：

在标准盒模型中，元素的宽度和高度只包括内容区域（content），不包括内边距（padding）、边框（border）和外边距（margin）。（这四个英文单词要非常熟悉）这意味着如果你设置了一个元素的宽度为 100px，那么这个宽度只应用于内容区域，内边距和边框的宽度会额外增加到这个宽度上。

在怪异盒模型中，元素的宽度和高度包括内容区域、内边距和边框，但不包括外边距。这意味着如果你设置了一个元素的宽度为 100px，那么这个宽度将包括内容、内边距和边框的宽度。

实际开发中，开发者往往更喜欢使用标准和模型，因为它可以让元素的宽度和高度更好地暴露出来，符合我们的预期。

display的block、inline、还有inline-block属性：

这个题也经常问，我们从字面意思上去理解，block就是块级元素，inline就是行内元素，inline-block就是行内块元素。

![alt text](image-414.png)

接下来我们来看几个效果，首先是block：

![alt text](image-415.png)

然后是inline：

![alt text](image-416.png)

这里inline多解释一句，图中可以看到宽度和高度显然是不能设置的，但是很多对“内边距上下有效”的说法理解有争议，再来解释一下：图中这幅卡着的状态（盒2与盒3内容是黏在一起的），你是很明显能够看到两个盒子内边距上下是无效的，但是如果你单看盒2或者盒3，你就能看到实际上蓝色的外面有个绿色的就是内边距。所以最准确的说法是，**inline的padding没有占位，但在实际的某个元素中看它是有的**。

最后就是inline-block，这个还好理解：

![alt text](image-417.png)
