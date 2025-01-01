# Part 2 APIs 部分

这一部分主要讲解了操作DOM BOM，比如控制网页元素交互等各种网页交互效果。

## Day1 DOM-获取元素：获取元素、修改属性

### 1. 变量声明

**建议：`const`优先，尽量使用`const`，JS中有个不成文的约定，优先使用`const`，如果发现需要改成`let`时再改成`let`。**

**建议数组和对象使用`const`来声明。** 对象是引用类型，里面存储的是地址，只要地址不变，`const`声明的对象是可以修改里面的属性的，不会报错。

### 2. DOM树和DOM对象

JavaScript = ECMAScript(JSC语言基础) + WebAPIs(BOM + DOM)

**什么是DOM？** DOM，文档对象模型，是用来呈现以及与任意HTML或XML文档交互的API。简单理解，DOM是浏览器提供的一套专门用来**操作网页内容**的功能。

浏览器根据HTML标签生成JS对象，即为DOM对象，DOM的核心就是把内容当对象来处理。

**document是什么？** 是DOM里提供的一个对象，网页所有内容都在document里面。

### 3. 获取DOM元素

获取DOM元素有几种方法，一种是**根据CSS选择器来获取DOM元素，** 还有些其他方法，前者很重要。

#### 根据CSS选择器来获取DOM元素（重要）

1. `document.querySelector('css选择器')`：获取**第一个**符合条件的元素，返回的是一个元素对象。**注意：引号一定要加，css选择器同css写法。**

注：如果要选择指定的某个元素对象，例如一个`ul`中包含了一堆的`li`，使用`nth-child`，可以这么写：
    
```javascript
const li = document.querySelector('ul li:nth-child(2)');    // 获取第二个li，这里元素的下标是从1开始的！
```

**下面一段使用属性选择器，很重要：**

```javascript
const li = document.querySelector('ul li[data-index="2"]');    // 获取data-index为2的li
```

2. `document.querySelectorAll('css选择器')`：获取所有符合条件的元素，返回的是一个**伪数组**（NodeList对象集合）。**伪数组有长度`length`和索引号，但是没有`pop()` `push()`等数组方法。** 哪怕只有一个元素，只要用`qurerySelectorAll`就会返回一个伪数组。

#### 其他获取DOM元素的方法

1. `document.getElementById('id名')`：根据id名获取元素，返回的是一个元素对象。

2. `document.getElementsByClassName('类名')`：根据类名获取元素，返回的是一个**伪数组**（HTMLCollection对象集合）。

3. `document.getElementsByTagName('标签名')`：根据标签名获取元素，返回的是一个**伪数组**（HTMLCollection对象集合）。

**注意，面试中可能还会问你`NodeList对象集合`和`HTMLCollection对象集合的区别`，先是要答出来他俩分别是由哪两个方法返回的，在要知道，`HTMLCollection`是实时更新的，当文档中元素发生变化时，集合会自动更新，而`NodeList`不会。**

### 4. 修改DOM元素内容

#### 4.1 `innerText`属性

`innerText`属性可以获取或设置元素的文本内容，**只能获取文本内容，不能获取标签内容。**

#### 4.2 `innerHTML`属性

`innerHTML`属性可以获取或设置元素的HTML内容，**可以获取标签内容。** 将字符串赋值给`innerHTML`时，需要通过引号包裹，例如`p.innerHTML = '<span>hello</span>'`。

**如果你还在纠结使用谁，我们就使用innerHTML。**

**注意：它得不到表单元素的内容，表单在后面单独拿出来讲。**

### 5. 操作DOM元素属性

#### 5.1 修改DOM元素常见属性

直接使用`元素对象.属性名 = 需要修改的属性值`这种方式来修改元素的属性。举例：

```javascript
// 获取元素
const img = document.querySelector('img');
// 修改img的src属性
img.src = 'https://www.baidu.com/img/flexible/logo/pc/result.png';  // 直接通过对象.属性名 = 属性值来修改
```

#### 5.2 修改DOM元素`样式`属性

**修改DOM元素的样式属性，常见有下面的三种方式：**

1. 通过`style`修改样式
2. 通过类名修改样式
3. 通过classList修改样式

##### 5.2.1 通过`style`修改样式

采用如下的语句：`对象.style.样式属性 = '值'`。**生成的是行内样式表，权重比较高。**

```javascript
// 获取元素
const p = document.querySelector('p');
// 修改p的样式
p.style.color = 'red';  // 通过style修改样式
p.style.fontSize = '30px';  // 注意，一般都需要带上单位
p.style.backgroundColor = 'black';  // 如果遇到多个单词使用'-'组成的属性，需要将后面的单词首字母大写，使用小驼峰命名法
```

**注意，当修改`body`元素的属性时，我们一般不需要先获取元素，因为整个页面只有一个body元素。**

```javascript
// 修改body的背景颜色
document.body.style.backgroundColor = 'black';
```

##### 5.2.2 通过`className`修改样式

有的时候，需要一次性修改多个样式，这时候直接修改`style`属性就显得很麻烦，这时候我们可以通过`className`来修改样式。

```css
/* CSS */
.active {
    color: red;
    font-size: 30px;
    background-color: black;
}
```

```javascript
/* JS */
// 获取元素
const p = document.querySelector('p');
// 修改p的样式
p.className = 'active';  // 通过className修改样式
```

**注：`className`是新值换旧值，如果需要添加一个类，要保留之前的类名。**

##### 5.2.3 通过`classList`修改样式（重要）

为了解决`className`容易覆盖此前类名的原因，我们可以使用`classList`来修改样式。**这是未来最常见的方式。**

`classList`是一个类数组对象，有3个方法，可以方便的操作类名。

```javascript
// 获取元素
const p = document.querySelector('p');
// 修改p的样式
p.classList.add('active');  // 通过classList添加类名

// 删除类名
p.classList.remove('active');  // 通过classList删除类名

// 切换类名
p.classList.toggle('active');  // 通过classList切换类名 没有就加上 有就删掉
```

#### 5.3 修改表单元素属性

注意，当我们设置表单元素（特指单个标签的表单元素，例如`input`）的值的时候，需要使用 `.value` 或者 `.type`，使用 `innerHTML` 往往取不到表单元素的值。**但是需要特别注意的是，我们可以使用`innerHTML`获取`button`的文本。**

![alt text](image-47.png)

此外，`input`标签可以通过`type`属性来设置输入框的类型，常见的有`text`、`password`、`radio`、`checkbox`、`file`等。当类型为`radio`或`checkbox`时，可以通过`checked`属性来设置是否选中，如果`checked`为`true`，则表示选中，否则表示未选中。

此外，`button`标签可以通过`disabled`控制按钮是否禁用，**特别要注意的是，如果`disabled`为`true`那么按钮被禁用。**

此外，H5新规范，如下面的控制`button`为`disabled`的示例：

```html
<button disabled>Click Me</button>
```

#### 5.4 自定义属性

![alt text](812370184342ff3e6d74950c31756d2.jpg)

自定义属性通过`data-`开头，在DOM上使用`dataset`对象方式获取。

**这个在往后开发的过程中似乎经常用到。**

### 6. 定时器、间歇函数

`setInterval(fn, interval)`函数会返回一个标号，这个标号标识了定时器的独一无二的值。

给一个开启定时器和关闭定时器的例子：

```javascript
function fn() {
    console.log('111');
}

let n = setInterval(fn, 1000);  // 开启定时器，1. fn不写括号 2. 必须使用let进行声明，因为后面需要关闭开启时会对n进行重新赋值。
clearInterval(n);   // 关闭定时器
n = setInterval(fn, 1000);  // 重新打开定时器
```

## Day2 DOM-事件基础：注册事件、tab栏切换

### 1. 事件监听

`addEventListener`是一个非常重要的方法，用来给元素绑定事件。语法：

```javascript
元素.addEventListener('事件名', function() {
    // 事件处理程序
});
```

![alt text](image-48.png)

拓展：事件监听的版本：又L0~L4四个版本。

![alt text](image-49.png)

**绑定了事件监听之后，例如`.addEventListener('click', function(){})`，那么接下来可以在外面通过JS调用`element.click()`模拟点击。**

### 2. 事件类型

有鼠标触发、表单获得光标、键盘触发、表单输入触发等。

![alt text](image-50.png)

**针对键盘一般更喜欢用`keyup`。**

### 3. 事件对象

事件对象是浏览器提供的一个对象，当事件发生时，会自动创建一个事件对象，这个对象中包含了当前事件的相关信息。

`.addEventListener('click', function(event) {})`，**这里的`event`就是事件对象。**

**常用属性：**

1. `event.type`：获取事件类型。
2. `event.clientX / event.clientY`：获取鼠标在**浏览器可见窗口左上角**中的X/Y坐标。
3. `event.offsetX / event.offsetY`：获取鼠标在**当前DOM元素左上角**中的X/Y坐标。
4. `event.key`：获取键盘按键。

**拓展：`trim`方法：**

`trim`方法可以去掉字符串两端的空格，但是不会去掉中间的空格。示例：

```javascript
const str = '  hello world  ';
console.log(str.trim());  // 'hello world'
```

### 4. 环境对象`this`

`this`是一个非常重要的对象，它代表当前函数运行时所处的环境。

判断`this`指向的粗略规则是：**谁调用，this就是谁。**

### 5. 回调函数

这里我们要求说出回调函数的定义：**把一个函数作为另外一个函数的参数传递，这个函数就叫回调函数。**

## Day3 DOM-事件进阶：事件流、事件委托、其他事件、元素尺寸与位置

### 1. 事件流

#### 1.1 事件流的两个阶段

**捕获、冒泡**

说明：假设页面里有个div，当触发事件时，会经历两个阶段，分别是捕获阶段、冒泡阶段。如下图：
![alt text](image-51.png)

捕获：从DOM的根元素开始去执行对应的事件。

冒泡：从当前元素开始，一直冒泡到DOM的根元素。**实际工作中，以事件冒泡为主。**

简单理解，当一个元素触发事件后，会一次向上调用所有父级元素的同名事件。事件冒泡是默认存在的，`addEventListener`的第三个参数默认为`false`，表示冒泡阶段，如果改成了true，就变成事件捕获了。

#### 1.2 阻止事件冒泡

因为默认就有冒泡模式的存在，所以容易导致事件影响到父级元素，若想把事件就限制在当前元素内，就需要阻止事件冒泡。`event.stopPropagation()`可以阻止事件冒泡，不光在冒泡阶段有效，捕获阶段也有效。

#### 1.3 事件解绑

1. L0移除：`element.onclick = null;`
2. L2移除：`element.removeEventListener('click', fn);`
**注意：匿名函数无法被解绑！**

#### 1.4 鼠标经过事件的区别

**`mouseover`和`mouseout`会有冒泡效果，`mouseenter`和`mouseleave`不会有冒泡效果。** 推荐使用`mouseenter`和`mouseleave`。

#### 拓展：两种注册事件的区别
![alt text](image-52.png)

#### 1.5 阻止默认行为

`event.preventDefault()`可以阻止默认行为，例如阻止a标签的跳转。

### 2. 事件委托

![alt text](image-53.png)

**通过`e.target`来获取当前点击的元素（`e`为事件对象），然后通过判断`e.target.tagName`来判断当前点击的元素是否是我们需要的元素。** 举例：`if (e.target.tagName === 'LI') { console.log('点击了li'); } // 需要使用全大写标签名`。

**案例学习小技巧**：把字符串转为数字，可以只需要在字符串前面加一个`+`号，例如`+'123'`。

### 3. 其他事件：页面加载事件、元素滚动事件、页面尺寸事件

#### 3.1 页面加载事件

要求较低，认识即可。

1. `load`等待**资源全部**加载完毕，再去执行事件。
2. `DOMContentLoaded`等待**DOM结构（HTML）**加载完毕，无需等待图片样式表等资源加载完毕就执行事件。

#### 3.2 元素滚动事件

![alt text](image-54.png)

**获取html元素写法**

`document.documentElement`

**开发中常用**

`scrollTop`获取被卷去的头部，**可读写**，获取到的是数字型的数据，不带单位。

`scrollLeft`被卷去的左侧。

![alt text](image-55.png)

**滚动到指定的坐标**

除此之外我们可以采用`window.scrollTo(x, y);`滚动到指定的坐标。

#### 3.3 页面尺寸事件

`resize`事件，当页面尺寸发生变化时触发。

**获取元素的可见部分边框**：`clientWidth`、`clientHeight`。

![alt text](image-56.png)

**获取元素的完整尺寸**：`offsetWidth`、`offsetHeight`。

![alt text](image-57.png)

**获取位置**：`offsetLeft`、`offsetTop`，这两个是只读属性，**最常用！**

![alt text](image-58.png)

`element.getBoundingClientRect()`：获取元素相对于**视口**的位置。（了解即可）

**总结**

![alt text](image-59.png)

### 4. 拓展：自执行函数

自执行函数是指在定义后立即执行的函数，语法如下：

```javascript
(function() {
    // 代码
})();
```

下面为一个简单的案例：

```javascript
(function (param1, param2) {
    console.log(param1 + ", " + param2);
})("Hello", "World");   // 参数传递
```

自执行函数的作用：

1. 防止变量污染。
2. 用于模块化开发。

## Day4 DOM节点、移动端滑动

### 1. 日期对象

#### 1.1 实例化

有两种实例化方式：不指定日期/指定日期：

```javascript
const d = new Date();  // 不指定日期
const d = new Date('2021-01-01');  // 指定日期
```

#### 1.2 日期对象方法

![alt text](image-60.png)

此外，我可以使用`date.toLocaleString()`来获取本地时间。还有`date.toLocaleDateString()`和`date.toLocaleTimeString()`，分别只获取日期和时间。

#### 1.3 时间戳

时间戳是指从1970年1月1日0时0分0秒到现在的毫秒数，可以通过`date.getTime()`或者`+new Date()`或者`Date.now()`来获取。选一个即可。

**时间戳转换为dd:hh:mm:ss的公式：**

![alt text](image-66.png)

### 2. 节点操作

#### 2.1 DOM 节点介绍

![alt text](image-67.png)

#### 2.2 查找节点

本节主要是通过元素节点的关系进行查找。**以前是无脑获取节点，现在可以通过关系进行查找。**

1. `parentNode`：获取父节点。
2. `childNodes`只做了解，重点掌握`children`。
![alt text](image-68.png)
3. 兄弟关系查找：`previousElementSibling`、`nextElementSibling`。

#### 2.3 增加节点（重要）

**创建节点**

`document.createElement('标签名')`：创建一个元素节点。

**追加节点**

![alt text](image-69.png)

**克隆节点**

`element.cloneNode(true)`：克隆节点，`true`表示深度克隆（类似深拷贝，把包含的后代节点一起克隆），`false`表示浅克隆（类似浅拷贝）。**大多数情况下，我们都会写上`true`，如果不写就只克隆标签。**

#### 2.4 删除节点

必须通过父元素调用删除。`父元素.removeChild(子元素)`：删除子元素。

### 3. M端（移动端）事件

**触摸事件有三个阶段：**

1. `touchstart`：手指触摸屏幕时触发。
2. `touchmove`：手指在屏幕上滑动时触发。
3. `touchend`：手指离开屏幕时触发。

### 4. JS 插件

**Swiper插件的使用**

![alt text](image-70.png)

**拓展**

`form`表单的`autocomplete`属性，可以设置为`off`，这样就可以关闭表单的自动填充功能。

`form`通过调用`reset()`方法可以重置表单。