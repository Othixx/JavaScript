# Day1 快速上手、插值表达式、指令上

## 1 Vue 快速上手

### 1.1 Vue 概念

![alt text](image-206.png)
如果我们写组件，那么就是Vue.js核心包开发，加上插件之后我们可以实现工程化开发。
![alt text](image-205.png)

### 1.2 创建一个 Vue 实例

分成下面的核心4步。
![alt text](image-207.png)

### 1.3 插值表达式

![alt text](image-208.png)

**一定要注意，插值表达式不能直接写在标签里面。**

### 1.4 Vue 的响应式特性

![alt text](image-209.png)
响应式的意思就是，当我们改变数据的时候，视图会自动更新。

## 2 Vue 指令

指令是指带有`v-`前缀的特殊标签属性。

### 2.1 指令与 `v-html`

![alt text](image-210.png)
注意，如果我们直接用插值表达式，`<div>{{msg}}</div>`，Vue是无法解析`msg`中的标签信息的，会把它当成纯文本，而`v-html`可以解析标签。

### 2.2 `v-show` 与 `v-if`

![alt text](image-211.png)
二者在底层实现上有区别，需结合实际场景进行选择。

### 2.3 `v-else` 与 `v-else-if`

它们必须跟`v-if`搭配使用。用于条件判断的渲染。
![alt text](image-212.png)

### 2.4 `v-on`

`v-on`指令用于监听DOM事件，语法为`v-on:事件名="方法名"`，**也可以简写为`@事件名="方法名"`**。

![alt text](image-213.png)

为了让事件监听能够处理更多的事件，如果我们只用上面这种内联方式，是不够的，所以我们可以把事件处理函数，单独抽离出来，放在`methods`中定义。需要注意的是，**`methods`中的函数内的`this`指向Vue实例**。

![alt text](image-214.png)

此外，我们还可以在函数调用时传入参数。

![alt text](image-215.png)

### 2.5 `v-bind`

`v-bind`指令用于**动态**绑定HTML属性，语法为`v-bind:属性名="表达式"`，**也可以简写为`:属性名="表达式"`**。如果不加冒号，那么相当于该属性写死。

![alt text](image-216.png)

### 2.6 `v-for`

`v-for`指令用于循环渲染列表，语法为`v-for="(item, index) in items"`。**这跟数组的`arr.forEach((value, index) => {})`方法很像。**

![alt text](image-217.png)
![alt text](image-218.png)

官网中有这样一句话：`v-for` 的默认行为会尝试原地修改元素（就地复用）而不是移动它们。这个有个例子，可以看黑马视频讲解，此处不再赘述。我们的结论是：**建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升**。如下图所示：

![alt text](image-221.png)
![alt text](image-219.png)

### 2.7 `v-model`

`v-model`指令用于双向数据绑定，**给表单元素使用**，语法为`v-model="变量名"`。它会根据输入类型自动应用适当的输入元素。

![alt text](image-220.png)

# Day2 指令下、计算属性、侦听器

## 1 指令补充

### 1.1 指令修饰符

指令修饰符是指在指令后添加的特殊标记，用于改变指令的行为。
![alt text](image-222.png)
![alt text](image-223.png)
如上图所示，只需要在指令后添加`.修饰符`即可。

### 1.2 `v-bind`对于样式控制的增强

首先可以通过操作`class`来实现样式控制：

![alt text](image-224.png)

此外，我们还可以通过操作`style`来实现样式控制：

![alt text](image-225.png)
![alt text](image-226.png)
如上图所示，我们非常方便的实现了样式的动态绑定。

### 1.3 `v-model`应用于其他表单元素

`v-model`不仅可以用于文本输入框，还可以用于其他表单元素，如复选框、单选按钮、下拉列表等。它会根据控件类型自动选取正确的方法来更新元素。

这里补充两个知识点：

- 对于`radio`单选按钮，通过设置它们的`name`属性来分组，设置`value`属性来指定选中时的值。
![alt text](image-227.png)
- 对于`checkbox`复选框，需要给每个选项指定`value`值，也是用来提交给后台。同时呢，`select`自身具有`.value`属性，表示选中的值。
![alt text](image-228.png)

## 2 计算属性

计算属性是指基于已有数据进行计算得出的新数据。它们可以在模板中像普通属性一样使用，但实际上是通过函数计算得出的。

![alt text](image-229.png)

使用计算属性可以提升性能，因为计算属性会对计算出来的结果缓存，再次使用直接读取缓存。

此外，当我们需要修改计算属性的值的时候，可以使用它的完整写法，一个计算属性实际上分成`get()`和`set(修改的值)`两个部分：

![alt text](image-230.png)

## 3 `watch`侦听器

![alt text](image-231.png)
基本使用方法如上图，`watch`侦听器适用于数据变化时需要执行异步操作或者开销较大的操作的场景。具体使用如下图（注意如果是对象里面的属性，得用引号引起来）：
![alt text](image-232.png)

除了上面这种简单写法之外，`watch`属性还有完整写法：
![alt text](image-233.png)
如果设置了`deep: true`，则对象里面的任意属性发生变化，都会触发侦听器的事件，返回的`newValue`是新的**整个对象**的值。而如果我们想要在组件创建时，就执行一次侦听器，可以设置`immediate: true`。

# Day3 生命周期、工程化开发（组件入门）

## 1 生命周期

![alt text](image-234.png)

Vue的生命周期有四个阶段，如上图所示。在创建阶段，Vue会准备响应式数据，完成后，在挂载阶段渲染模板，在更新阶段发现数据变化，重新渲染模板，最后在销毁阶段清理资源。

四个阶段的生命周期对应了八个钩子函数：

![alt text](image-235.png)

都是两两一对，重点了解`created`和`mounted`两个钩子函数。

## 2 工程化开发入门

我们使用Vue原生的，Vue CLI来搭建项目。
![alt text](image-236.png)
具体如何启动这个Vue项目的话，我们根据根目录下面的`package.json`文件中的`scripts`字段来查找相应的命令。

### 2.1 项目运行流程

在创建完一个项目之后，会产生这些文件和文件夹：
![alt text](image-238.png)
![alt text](image-237.png)
我们实际上在运行一个项目时，入口是`main.js`文件，通过执行`main.js`代码的逻辑，首先导入Vue，其次导入我们写的App.vue，最后实例化组件，从而完成渲染。

### 2.2 组件化开发、根组件

![alt text](image-239.png)
![alt text](image-240.png)
如上图所示，一个Vue项目的根组件是`App.vue`，它是整个应用的入口组件。每个组件又由`<template>`、`<script>`和`<style>`三部分组成。在Vue2中，`<template>`只能有一个根节点。

在`<script>`中，采用下面的写法：

```javascript
export default {
    methods: {
        fn () {
            alert('Hello Vue!')
        }
    }
}
```

### 2.3 组件注册

对于组件注册，有两种方式，分别是局部注册和全局注册。

#### 2.3.1 局部注册

局部注册是指在组件内部使用`components`选项进行注册，如下所示：

![alt text](image-242.png)
![alt text](image-241.png)
注意组件名如果不写成大驼峰格式的话，需要使用`kebab-case`（短横线命名法）来注册，如下所示：

```javascript
export default {
    components: {
        'my-component': MyComponent
    }
}
```

不过还是建议写成大驼峰命名法。

注册完成后，在组件内就可以使用了。

#### 2.3.2 全局注册

![alt text](image-243.png)
如上图所示，需要在`main.js`中进行全局注册。**一般而言，都使用局部注册，如果确实发现是通用组件，再定义到全局**。

# Day4 组件通信、进阶用法

## 1 组件的三大组成部分细讲

![alt text](image-247.png)

### 1.1 组件的样式冲突 `scoped`

![alt text](image-244.png)

如上图所示，如果我们再写组件时，不在`<style>`标签中添加`scoped`属性，那么这个属性是全局的，会影响到其他的标签。我们需要加上`scoped`属性来实现这个属性只作用于当前组件。

内部原理上，Vue会给每个组件的样式添加一个独一无二的属性，比如`data-v-hash`，然后在渲染的时候，自动加上这个属性，从而实现样式的局部作用。
![alt text](image-245.png)

### 1.2 `data`是一个函数

![alt text](image-246.png)

我们在给组件定义`data`时，必须使用一个函数来返回数据对象，而不是直接返回一个对象。这是为了确保每个组件实例都有自己的独立数据，避免数据共享导致的混乱。

## 2 组件通信

![alt text](image-248.png)
为啥需要组件通信呢？是因为不同组件之间，他们的数据是隔开的，不能相互访问。上图是一个组件通信的总结，最重点的是父子组件之间的通信，非父子关系的了解即可。

### 2.1 父子通信

#### 2.1.1 父传子

![alt text](image-249.png)

如上图所示，对于父传子，先要在父组件中给使用子组件的地方添加一个指定的属性，然后在子组件中通过`props`选项接收这个属性，接收来的这个属性就可以像自身的属性一样，用插值表达式的方式进行渲染。**注意，如图所示，在传递给孩子的属性前面加上冒号`:`，是为了能够让子组件收到一个动态的值，一旦父组件发生了变化，这个动态的值就会变化，从而子组件同步更新。而不是将其写死**。

#### 2.1.2 子传父

![alt text](image-250.png)

子传父稍微有些绕，请好好看上面那张图。它需要先在子组件中定义一个事件，在事件中调用`$emit`方法，附带数据传递给父组件。在父组件使用子组件的地方，用另外一个事件去监听子组件的事件，注意看图中的`@changeTitle`事件名，这里需要和子组件中的事件完全一致。接着，父组件在方法中定义新的事件，该事件的形参可以取到子组件传递过来的数据，根据需要修改数据即可。

### 2.2 `props`校验

![alt text](image-251.png)
如上图所示，有的时候我们需要对`props`传递的数据进行判断，防止传错了一些数据，就需要对它进行校验，**为此我们要把它写成对象的形式而非一开始给出例子的数组的形式，此外，为了稳定而言以后统统写成对象的形式，不要写成数组形式**。

在校验中，最为常用的是类型校验，写的方法和右边第一张图一致。如果我们需要更详细的校验，按照第二张图的写法，再套一个对象。

**另外请注意，子组件不能修改父组件传过来的数据，如果要修改，请`$emit`通知父组件**。谁的数据谁负责。

### 2.3 非父子通信（了解即可）

#### 2.3.1 Event Bus 事件总线

在非父子通信的**简易场景**中，我们使用Event Bus进行通信。它就是创建一个空的Vue实例，接着将两个组件都与这个实例绑定，一个用来发送消息，另一个用来监听。复杂场景建议使用Vuex进行通信。

![alt text](image-252.png)

#### 2.3.2 provide 与 inject

`provide`和`inject`用于跨级组件通信。父组件使用`provide`提供数据，**子孙**组件使用`inject`注入数据。请注意，**子孙不能传递给自己的祖先，它只能向下传递；此外也不能用在两个没有爷父子孙关系的组件，比如说兄弟组件，或者说是任意两个组件**。

![alt text](image-253.png)

另外还有一点需要特别注意的是，如果`provide`提供的数据是一个对象，那么这个对象是响应式的，子孙组件可以直接使用这个对象的属性；**如果是一个普通变量，那么这个变量是非响应式的**，这是作者刻意为之的。所以如果我们需要用到响应式的变量，我们一般会将其封装在一个对象中，然后通过`provide`提供这个对象。

## 3 进阶语法

### 3.1 `v-model`原理

它本质上就是个语法糖。实现了数据的双向绑定，例如应用在输入框上，就是`value`属性和`input`事件的合写。（复习：`:`是`v-bind`的缩写，用于实现数据变了，试图跟着变）

![alt text](image-254.png)

另外需要注意的一点是，如果我们的表单变化事件写在模板里面，事件的形参用原来的`e`或者其他形参表示是不能用的，需要写成`$event`形式。

### 3.2 `v-model`应用于组件

#### 3.2.1 表单类组件封装

有的时候表单类很复杂，代码又需要被复用，这个时候我们可以把表单类封装成一个组件，那么就出现了组件之间的数据传递问题。

在使用这个表单类组件的过程中，我们的数据显然是由父亲组件传递过来的，同时呢我们又需要实现表单类组件和父组件数据的双向绑定，但是`v-model`不能够直接用到父子组件身上，这就需要进行`v-model`的拆解了。怎么拆解呢，就是根据刚才讲过的`v-model`原理进行拆解，拆分成一个属性和一个事件的合写。

请牢记我们的目标：就是实现数据间的双向绑定。详见下图。

![alt text](image-255.png)

#### 3.2.2 `v-model`简化表单类组件封装代码

这部分内容是针对3.2.1的。我们可以使用`v-model`来简化表单类组件的封装代码。**但是有个前提，子组件中一定要使用`value`来接收，父组件中监听的事件名称必须是`input`**。

![alt text](image-256.png)

这样子设置之后，就能使用`v-model`来简写，实现双向绑定了。为什么可以这么设置呢？**因为`v-model`实际上就是对`value`属性和`input`事件的语法糖封装**。

### 3.3 `.sync`修饰符

这一部分内容又是针对刚才的3.2.2进行补充的。因为有的时候，我需要绑定的属性叫`value`不是很合理，比如说控制一个元素的显示或关闭，应该叫`visible`更为合理。这怎么办呢？我们可以使用`.sync`修饰符。

![alt text](image-257.png)

但是这种写法又没刚才的`v-model`来的方便，因此我们在实在不能用`v-model`时，才会使用这种`.sync`，大部分情况下都用的`v-model`。

### 3.4 `ref`和`$refs`

`ref`是Vue提供的一个特殊属性，用于给DOM元素或子组件注册引用信息。通过`$refs`可以在组件实例中访问这些引用。

使用`ref`的步骤如下：

1. 在模板中给需要引用的元素或组件添加`ref`属性。
2. 在组件实例中通过`this.$refs`访问。

![alt text](image-258.png)

通过`ref`和`$refs`我们可以把查找范围缩小到当前组件内，而不是调用`querySelector`等方法在整个整个页面中查找。

![alt text](image-259.png)
此外，如上图所示，`$refs`可以用于访问子组件的方法和属性，方便进行组件间的交互。

### 3.5 Vue异步更新与`$nextTick`

在Vue中，数据的更新是异步的，这意味着在同一个事件循环中，多个数据更新可能会被合并为一次DOM更新。这种行为可以提高性能，但也可能导致一些问题，例如在数据更新后立即读取DOM状态时，可能会得到旧的值。

为了解决这个问题，Vue提供了`$nextTick`方法。它可以让我们在下次DOM更新循环结束后执行一个回调函数，从而确保我们获取到的是最新的DOM状态。

![alt text](image-260.png)
![alt text](image-261.png)

# Day5 自定义指令、插槽、路由入门

## 1 自定义指令

### 1.1 自定义指令基本语法

自定义指令是“自己定义的指令”，可以封装一些DOM操作，扩展额外功能。我们可以使用**全局注册**和**局部注册**两种方式，来设置自定义指令。

![alt text](image-262.png)

如上图所示，对于全局注册，需要在`main.js`入口处添加如图所示的一段代码。如果需要局部注册，则在组件内部写JS的地方添加如图所示的代码，如下图所示：

![alt text](image-263.png)

目前需要掌握自定义指令中的两个钩子函数：

1. `inserted`：被绑定元素插入父节点时调用
2. `update`：所在组件的 VNode 更新时调用

在这两个钩子函数中，`el`是被绑定的元素，可以通过`el`来进行DOM操作。

### 1.2 指令的值

![alt text](image-264.png)

指令的值可以通过`binding.value`来获取。

### 1.3 `v-loading`指令封装

这一部分内容在这里不写，详见视频。

## 2 插槽

### 2.1 默认插槽

插槽的作用，主要是为了组件的复用性。有的时候一个组件我们会用到很多次，但是有的地方需要我们根据做出不同的处理，我们可以把组件中不确定的部分，使用插槽来进行占位，这样子就能让组件更具通用性。

![alt text](image-266.png)
![alt text](image-265.png)

如上图所示，将原来的组件中的不确定部分，使用`<slot></slot>`进行占位，然后在使用组件的地方，将具体的内容放在组件标签内即可。

### 2.2 插槽-后备内容（默认值）

如果我们在使用组件的地方没有放入内容，有的时候会需要显示默认值。默认值可以通过`<slot>默认内容</slot>`来设置。

![alt text](image-267.png)

这样子，如果没有放入内容，就会显示标签里的默认值。

### 2.3 具名插槽

有的时候，一个组件内有多处结构，需要外部传入标签，进行定制。如果使用默认插槽，它只能定制组件内部的一处地方。这个时候需要使用`template`标签和`slot`属性来实现具名插槽。

![alt text](image-268.png)

同时，为了方便，**`v-slot`指令可以简写为`#`**。

### 2.4 作用域插槽

首先需要明白的是，Vue里面的插槽只有两大类，一类是默认插槽，另一类是具名插槽。作用域插槽的作用是，可以给插槽上绑定数据，供将来使用组件时使用。

![alt text](image-269.png)
如图所示，设想我们有这样一个使用场景，有两个表格，他们需要渲染由父亲传过来的两个不同的数据，同时最后一栏的按钮功能也不相同，一个是删除，一个是查看。我们对需求进行分析，①渲染从父亲传过来的数据，需要用到父传子，动态渲染表格；②按钮功能不同，需要用到插槽。

**但是问题来了，我在给按钮写方法的时候，怎么样取到当前数据的`item`呢？如果我们直接尝试在父亲的`methods`中写一个方法，传入`item`，然后在子组件中调用这个方法，是无法取到当前的`item`的，因为父亲的`methods`中没有这个数据**。

这个时候，就需要通过我们的作用域插槽来解决这个问题。
![alt text](image-270.png)
把上面这段代码好好看一下，理解消化一下。

## 3 路由入门

### 3.1 单页应用程序

单页应用程序（SPA）是指在一个页面内加载所有内容，而不是每次都重新加载整个页面。

![alt text](image-271.png)

### 3.2 路由概念

![alt text](image-272.png)

### 3.3 VueRouter的基本使用（5+2）

5个基本步骤+2个核心步骤

![alt text](image-273.png)
一般来说，有“2 3 3，3 2 2”公式。用的是Vue2，就搭配Vue Router 3.x版本，以及Vuex 3.x版本；用的是Vue3，就搭配Vue Router 4.x版本，以及Vuex 4.x版本。上图中的5个基本步骤需要牢记。

![alt text](image-274.png)
另外在这两个核心步骤中，需要注意的是，①`<router-view></router-view>`是一个占位符，用于显示当前路由对应的组件，它的位置决定了路由组件的渲染位置。有的时候我们需要导航栏在下面，内容在上面，那么就可以把`<router-view>`放在导航栏的上面；②我们的路由组件不要放在components文件夹中，而是放在views文件夹中，这样子更符合语义化。

组件也即分成了页面组件和复用组件，页面组件放在views文件夹中，复用组件放在components文件夹中。

# Day6 路由进阶

## 1 路由模块封装

我们之前在配置VueRouter时，都是在`main.js`中进行配置的，这样子会显得`main.js`文件过于臃肿，分工不明确，因此我们可以把路由的配置单独封装成一个模块。我们一般会在`src`目录下新建一个`router`文件夹，然后在该文件夹中创建一个`index.js`文件，专门用于路由的配置。

![alt text](image-275.png)
如上图所示，我们只需要在`main.js`中在`new`的时候添加好配置，其他的相关配置我们都放到`router/index.js`中即可。需要注意的是引入相应`views`组件的路径会发生变化，为了方便，我们可以用`@`来表示`src`目录。

## 2  声明式导航 & 导航高亮 / 精确匹配&模糊匹配 / 自定义高亮类名 / 声明式导航传参 ( 查询参数传参 & 动态路由传参 )

### 2.1 声明式导航 & 导航高亮

有的时候，我们需要实现导航高亮效果。
![alt text](image-276.png)
我们很显然可以使用各种JS语法来实现这个功能，但是太麻烦了。Vue Router提供了一个`<router-link>`组件，专门用于实现导航功能。它会根据当前路由的路径，自动为匹配的链接添加一个类名`router-link-active`（或者`router-link-exact-active`），我们只要给这个类名设置样式，那么它就可以自动实现导航高亮效果。

![alt text](image-277.png)
如上图所示，原来的`<a>`标签，换成`<router-link>`即可，并省略`#`号。**我们说的声明式导航，或者导航链接，就是指使用`<router-link>`来实现导航功能**。

### 2.2 精确匹配&模糊匹配

![alt text](image-278.png)
刚才的还没讲完。使用`<router-link>`组件时，会给路由添加两个类名，分别是`router-link-active`和`router-link-exact-active`。前者是模糊匹配，后者是精确匹配。一般情况下，模糊匹配的场景更加常见。

### 2.3 自定义高亮类名

有的时候，我们需要自定义高亮类名。可以通过在实例化VueRouter时，传入一个`linkActiveClass`（或者`linkExactActiveClass`）选项来实现。

![alt text](image-279.png)

### 2.4 声明式导航传参

![alt text](image-284.png)

在使用`<router-link>`时，有两种传参的方式，它们各有优劣，查询参数传参适合多个参数的情景，动态路由传参适合单个路由的情景。

#### 2.4.1 查询参数传参

查询参数传参是指在URL中添加类似查询参数的字符串，Vue Router会自动解析这些参数并将其传递给组件。如果有多个参数，可以用`&`连接，这个和之前axios的查询参数写法是一样的。

![alt text](image-280.png)

接着，在对应的路由组件中，通过`$route.query.参数名`来获取查询参数。如果写在`<script>`中，注意要用`this.$route.query.参数名`来获取，如下图所示。

![alt text](image-281.png)

#### 2.4.2 动态路由传参

除了查询参数传参外，我们还能通过动态路由的方式实现传参。

![alt text](image-282.png)

如上图所示，在动态路由传参中，我们写在动态路由中的参数名要加上冒号`:`，这样子Vue Router就会自动解析这个参数，并将其传递给组件。取参数时，使用`$route.params.参数名`来获取。

#### 2.4.3 动态路由参数可选符

![alt text](image-283.png)

有的时候，我们需要在不写额外参数的情况下，能够访问根路由组件，这个时候可以使用动态路由参数可选符`?`。如上图所示。

## 3 路由重定向 / 路由404 / 路由模式

### 3.1 路由重定向

![alt text](image-285.png)

比较简单，看图即可。

### 3.2 路由404

![alt text](image-286.png)

其实就是新建一条规则，可以匹配任意的路径，一定要放最后，如果前面的都不命中就命中404页面。

### 3.3 路由模式

![alt text](image-287.png)

Vue Router有两种路由模式，分别是`hash`模式和`history`模式。默认使用的是`hash`模式。如果我们要改成`history`模式，需要在实例化VueRouter时，传入一个`mode: 'history'`选项，并告知后台开发人员进行调整。

## 4 编程式导航与传参

在实际中，我们有下面的需求：

![alt text](image-288.png)

如图所示，单击一个按钮，如何跳转到另一个页面？与此同时，如何携带参数呢？这就需要我们使用一些JS的功能进行实现。

实际上，我们有两种跳转方式，分别是**path路径跳转**以及**name命名路由跳转**，这两种跳转方式呢，又都支持两种传参方式，分别是**查询参数传参**以及**动态路由传参**。（而往细的讲，对于查询参数传参的方式，又支持用`&`拼接以及对象形式传参两种方式。）归纳下来，就是下面的图片：

![alt text](image-289.png)

我们现在来详细讲解。

### 4.1 path路径跳转

![alt text](image-290.png)
![alt text](image-292.png)

如图，又分成了简单形式和对象形式两种写法。

### 4.2 name命名路由跳转

![alt text](image-291.png)

注意，采用这种方式的话，需要在`new VueRouter`时，给相应的路由规则添加`name`属性。这种适用于跳转路径比较长的情况。

### 4.3 查询参数传参

之前已经说过，无论是path路径跳转还是name命名路由跳转，都支持查询参数传参。下面介绍这两种路由跳转方式的查询参数传参方式。

![alt text](image-293.png)
![alt text](image-294.png)

直接看图。**请注意，使用查询参数传参，适合参数较多的情况**。

### 4.4 动态路由传参

请注意，使用动态路由传参之前，需要配置好动态路由。一般而言，它只适合传递一个参数的情况。下面给出使用path路径跳转和name命名路由跳转两种方式的动态路由传参方式。

![alt text](image-295.png)
![alt text](image-296.png)

这一部分的知识点比较绕，需要多总结，多磨。

## 5 组件缓存 keep-alive

有的时候，我们需要缓存组件的状态，避免每次切换路由时都重新渲染组件。Vue提供了`keep-alive`组件来实现组件的缓存。keep-alive 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。keep-alive 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。

![alt text](image-297.png)
![alt text](image-298.png)

重点掌握`include`，另外两个了解。

![alt text](image-299.png)

由于不会再执行老的三个钩子，keep-alive为我们提供了两个新的钩子函数，分别是`activated`和`deactivated`。它们分别在组件被激活和停用时调用。

## 6 基于 VueCli 自定义创建项目架子

我们安装好VueCli之后，可以通过`vue create 项目名`命令来创建一个Vue项目。创建过程中，我们可以选择手动配置一些选项，来定制我们的项目架子。

后面都推荐使用 VueCli 去创建项目。

## 7 ESlint 代码规范

我们平时在开发前端时，一般需要遵循的是ESlint代码规范。JavaScript Standard Style 规范说明：https://standardjs.com/rules-zhcn.html

![alt text](image-300.png)

如果我们在前面使用了 VueCli 创建项目，并且选择了 ESLint 选项，那么它会自动帮我们安装好 ESLint 相关的依赖包，如果我们编写的代码没有遵循该规范，则在保存时会报错。

此外，我们可以安装 vscode 的 ESLint 插件，自动帮我们修复错误。

![alt text](image-301.png)

需要注意的是，上面的 `"source.fixAll": true` 现已逐渐被弃用，应该改成 `"source.fixAll.eslint": "explicit"`。

# Day7 Vuex 的基本使用

## 1 Vuex 概述

![alt text](image-302.png)

Vuex 是一个 Vue 的状态管理工具，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 2 创建一个空仓库

![alt text](image-303.png)

如上图所示，在安装完 vuex 之后，我们需要在`src`目录下新建一个`store`文件夹，然后在该文件夹中创建一个`index.js`文件，专门用于 Vuex 的配置。之后在该文件下执行第3步，创建 vuex 实例并导出，最后在`main.js`中引入，并挂载到 Vue 实例上。

在所有的配置完成之后，我们可以在组件中通过`this.$store`来访问 Vuex 实例。

## 3 如何提供&访问vuex的数据

### 3.1 提供数据

和组件的`data`选项类似，Vuex 使用`state`选项来提供数据。

![alt text](image-304.png)

### 3.2 访问数据

访问数据我们主要有两种方式，一种通过`this.$store.state.属性名`来访问，另一种是通过`mapState`辅助函数来访问。

![alt text](image-305.png)
![alt text](image-306.png)

之所以通过`mapState`来访问，是为了简化代码。我们在组件的计算属性中，使用展开运算符来展开`mapState`返回的对象，这样子就能直接在模板中使用计算属性来访问 Vuex 的数据了。

## 4 mutations 的基本使用

vuex 同样遵循单向数据流，组件中不能直接修改仓库的数据。如果我们要修改state中的数据，必须通过`mutations`选项来定义修改方法，然后在组件中通过`this.$store.commit('方法名', 参数)`来调用。

![alt text](image-307.png)
![alt text](image-308.png)

注意：永远不要将v-model与vuex中的数据直接进行绑定！会引起不必要的错误。

## 5 辅助函数 mapMutations

在组件中调用`mutations`方法时，如果直接使用`this.$store.commit('方法名', 参数)`，代码会显得比较冗长。为此，我们可以使用`mapMutations`辅助函数来简化代码。

![alt text](image-309.png)

和前面的`mapState`类似，我们在组件的`methods`中，使用展开运算符来展开`mapMutations`返回的对象，这样子就能直接在模板中使用方法来调用`mutations`了。

## 6 actions

有的时候，我们需要在修改数据之前，先进行一些异步操作，比如说发送网络请求获取数据，然后再根据获取到的数据来修改 Vuex 中的数据。这个时候，我们就需要使用`actions`选项来定义异步操作方法。**请注意，`actions`中的方法是不能直接修改`state`中的数据的，它只能通过调用`mutations`来间接修改数据**。

![alt text](image-311.png)

同时，可以使用`mapActions`辅助函数来简化代码。

![alt text](image-312.png)

## 7 getters

有的时候，我们需要对 Vuex 中的数据进行一些计算或者过滤，然后再提供给组件使用。这个时候，我们就需要使用`getters`选项来定义计算属性。同时，可以使用`mapGetters`辅助函数来简化代码。

![alt text](image-313.png)

请注意总结，如果我们是一个属性，一般就放在`computed`中，如果是一个方法，一般就放在`methods`中，如下图所示：

![alt text](image-314.png)

## 8 vue 分模块

Vue 拆分 module 的目的是为了让中大型项目变得更好维护。由于 vuex 使用**单一状态树**，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

所以，我们会根据功能将 store 拆分成模块（module）。每个模块拥有自己的 state、getters、mutations 以及 actions，甚至是嵌套子模块。

![alt text](image-310.png)

如图所示，我们在`store`文件夹下新建一个`modules`文件夹，然后在该文件夹中创建不同的模块文件，比如说`count.js`和`person.js`。在每个模块文件中，定义该模块的 state、getters、mutations 以及 actions。最后，在`index.js`中通过`modules`选项将这些模块进行注册。

### 8.1 命名空间与子模块`state`的访问

![alt text](image-315.png)

如图所示，尽管已经分模块了，如果不开启命名空间的话，子模块还是会默认挂载到根级别的`state`上。在下面的访问`state` `getters` `mutations` `actions`时，都有两种形式，一种不开启命名空间，采用原生访问的形式，这种形式较为冗长，不过很直接，也得会；另一种是开启命名空间，采用辅助函数的形式，这种形式较为简洁，也推荐使用。

**建议都开启命名空间，而不是直接挂载到全局，否则代码难以维护**。

如何开启命名空间呢，如上图所示，在模块中添加`namespaced: true`即可。

### 8.2 子模块`getters`的访问

![alt text](image-316.png)

### 8.3 子模块`mutations`的访问

![alt text](image-317.png)

### 8.4 子模块`actions`的访问

![alt text](image-318.png)

# Day11 Vue3 入门

## 1 为什么要学 Vue3？

![alt text](image-319.png)

- 组合式API允许我们更好地组织和复用代码，可以将一个模块的数据、方法等直接放在一起。
- 有着更良好的TS支持，底层直接使用TS编写。
- 打包时可以按需引入，减小代码体积。等等。

## 2 create-vue 创建 Vue3 项目

![alt text](image-320.png)

在以前版本的 Vue 中，我们使用 Vue CLI + Webpack 来创建和打包项目，而在 Vue3 中，官方推荐使用`create-vue`脚手架工具和vite来创建和打包项目。

## 3 对比 vue2 做的一些调整

![alt text](image-321.png)

## 4 组合式API

### 4.1 setup选项

![alt text](image-322.png)

在Vue3中，我们可以使用`setup`选项来替代`data`、`methods`、`computed`等选项，用来传送数据和方法。`setup`选项是一个函数，它在组件实例化之前执行，并且在这个函数中，我们可以定义响应式数据、计算属性和方法。

因为它比`beforeCreate`钩子函数更早执行，所以在`setup`中是无法访问到`this`的，直接指向`undefined`。

![alt text](image-323.png)

上图为使用`setup`选项的一个例子。需要注意的是，在`setup`中定义的数据和方法，需要通过返回一个对象的形式暴露出来，才能在模板中使用。当然，如果我们每次要写返回对象，挺麻烦的，因此我们可以使用`<script setup>`语法糖来简化代码。

![alt text](image-324.png)

在底层仍旧是返回一个对象帮助我们实现。

![alt text](image-325.png)

### 4.2 reactive 和 ref

在Vue2中，我们使用`data`选项来定义响应式数据，而在Vue3中，我们因为有了setup选项，默认来说，我们在下面定义数据就相当于直接把数据放在了`<script>`下面，那显然不是响应式的。我们可以使用`reactive`和`ref`来定义响应式数据。

![alt text](image-326.png)
![alt text](image-327.png)

如上图所示，`reactive`用于定义对象类型的响应式数据，而`ref`用于定义简单类型或者对象类型的响应式数据。

如果未来我们需要在`<script>`中使用`ref`定义的数据，需要加上`.value`来访问，而`reactive`不需要。同时，在模板中，`ref`定义的数据可以直接使用，而不需要加`.value`。

![alt text](image-328.png)

实际开发中显然更推荐使用`ref`，因为它更灵活。

### 4.3 计算属性 computed

计算属性的用法和Vue2类似。

![alt text](image-329.png)

![alt text](image-330.png)

当然不能什么东西都往计算属性里面放，`get`和`set`的配置可以参见官方文档。

### 4.4 侦听数据 watch

![alt text](image-331.png)

如果是侦听多个数据，用数组把它扩起来。不论哪个数据发生变化，都会执行回调。

![alt text](image-332.png)

此外，和Vue2一样，也可以使用`immediate: true`来立即执行回调；使用`deep: true`来深度侦听对象（默认情况下为浅层侦听）。

![alt text](image-333.png)

此外，它还可以精确侦听对象的某个属性：

![alt text](image-334.png)

用两个箭头函数的形式去实现。

![alt text](image-335.png)

关于侦听器的部分，总的来说还是要多使用，多参考文档。

### 4.5 生命周期函数

Vue3中的生命周期函数相比于Vue2有一丝丝的不同，但是都很有迹可循。

![alt text](image-336.png)

我们这样去观察，`beforeCreate`和`created`钩子函数，直接被`setup`选项所取代：

![alt text](image-337.png)

我们不需要再去写什么函数，而是直接放在`<script setup>`下面即可。如上图中的`getList()`方法就会在一进入页面后被立即调用。

而中间的几个函数，`beforeMount`、`mounted`、`beforeUpdate`、`updated`，则分别被替换成了`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`，它们的用法和Vue2类似，只不过是函数名加了`on`而已。最后的销毁函数`beforeDestroy`和`destroyed`，则被替换成了`onBeforeUnmount`和`onUnmounted`，需要记忆。

在使用生命周期函数时，需要导入并进行调用。除此之外，它不会像Vue2那样只能写一个同名的钩子函数，导致所有的逻辑都存在于同一个钩子中。你可以写多个相同名称的钩子函数，这些钩子函数会从上往下顺次执行。

![alt text](image-338.png)

![alt text](image-339.png)

请注意：**在使用生命周期钩子函数前，首先一定要导入它！！！**

### 4.6 父子传递

这部分内容和Vue2很相似，但是写法上有些不同。（这部分内容感觉很容易忘）

父子传递搞不懂看这篇文章 https://juejin.cn/post/7046940339621330974

![alt text](image-342.png)

#### 4.6.1 父传子

![alt text](image-340.png)

父组件中绑定需要传递给孩子的属性（如果这个属性是动态的需要发生变化，那么就在前面加上冒号`:`）。在子组件中，通过`defineProps`**编译器宏**来接收这个属性。请注意不能使用普通的`props`选项了，因为是`<script setup>`语法糖（我也不知道为什么这么规定，反正就是这么规定的）。

#### 4.6.2 子传父

![alt text](image-341.png)

没啥好多讲的，看图。

### 4.7 模板引用

首先了解模板引用的概念：即通过ref标识获取真实的dom对象或者组件实例对象。

![alt text](image-343.png)

如上图所示，在绑定完了上面两步之后，上图中的`h1Ref`就可以访问到`<h1>`标签的真实DOM对象。另外需要注意的是，在`<script setup>`语法糖中，默认情况下组件内部的属性和方法是不开放给父组件访问的，需要使用`defineExpose`编译器宏来显式地暴露给父组件。

![alt text](image-344.png)

![alt text](image-345.png)

此外，获取模板引用需要等到组件加载完毕，即`onMounted`钩子函数，才能获取到。

### 4.8 provide 与 inject

这是一种很好的实现组件数据跨层级传输的方式。通过这种方式，顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信。

有下面的三种方式：

![alt text](image-346.png)

![alt text](image-347.png)

![alt text](image-348.png)

## 5 Vue3.3 新特性

### 5.1 defineOptions

`defineOptions`是Vue3.3新引入的一个编译器宏，用于在`<script setup>`语法糖中定义组件的选项（因为在这个语法糖里不能去定义其他平级的东西比如props或者options），比如说组件的名称、继承的属性等。

具体可以参考这篇文章 https://www.cnblogs.com/ganto/articles/17917868.html，它的前面部分讲得比较清楚。

![alt text](image-349.png)

### 5.2 defineModel

![alt text](image-350.png)

这一部分还不是很懂，暂时先留着。

# Day12 Pinia 入门

![alt text](image-362.png)

## 1 什么是 Pinia？

![alt text](image-351.png)

对于如何安装 Pinia，请参考官方文档。

## 2 Pinia 基本使用

![alt text](image-353.png)

![alt text](image-354.png)

我们在`src`目录下新建一个`stores`文件夹，然后在该文件夹中创建不同的模块文件，比如说`counter.js`。在每个模块文件中，定义该模块的 state、getters等。最后，在`main.js`中通过`app.use(pinia)`将 Pinia 注册到 Vue 应用中。

![alt text](image-352.png)

上图中展示我们在配置完了 Pinia 之后，如何在组件中使用 Pinia(store和action)。上面的定义Store部分写在`counter.js`中，下面的使用Store部分写在组件中。

![alt text](image-355.png)

上图中则展示了计算属性的实现方式。

## 3 Pinia 异步请求

异步action函数的写法和组件中获取异步数据的写法完全一致，无需要像Vuex一样，通过actions再传递到mutations中，来实现异步操作。

![alt text](image-356.png)

如图所示，直接在action中使用`async/await`语法即可。

## 4 解构 store 造成的响应式丢失问题

在组件中使用 Pinia 时，如果我们对 store 进行了解构赋值，那么会导致响应式丢失的问题。为了解决这个问题，我们可以使用`storeToRefs`辅助函数来保持响应式。**当然了，如果我们不需要使用状态，而使用里面的方法时，可以直接进行解构（因为不需要响应式）**。

![alt text](image-357.png)

![alt text](image-360.png)

上图为官方文档中的说明。

详解：为什么会丢失响应式？

实际上，Pinia 的官网中提到了下面这句话：

![alt text](image-358.png)

好家伙，使用`reactive`包装的对象不能解构吗？于是我又去查了`reactive`的文档，发现确有此事：

![alt text](image-359.png)

最后官方甚至还说了句，建议使用`ref`作为声明响应式状态的主要API。我很不理解，既然这样，那么官方为什么还要采用`reactive`来实现`store`呢？我觉得这可能是一个设计上的缺陷吧，不知道在未来会不会修正。

## 5 Pinia 持久化插件

![alt text](image-361.png)

如图所示，使用`pinia-plugin-persistedstate`插件，可以实现 Pinia 的持久化存储功能。安装好插件之后，在`main.js`中引入并使用该插件。然后，在需要持久化的 store 中，添加`persist: true`选项即可。

具体参见官方文档。

# Vue3 大事件项目

接口地址 https://fe-bigevent-web.itheima.net/

**重要！在编写本项目前，强烈建议关闭vscode中的自动包导入（auto import）功能，防止造成不必要的麻烦**。

关闭方法：打开vscode设置，搜索`import`，找到`Javascript/Typescript: Auto Import Suggestions`选项，取消勾选即可。

## pnpm 包管理器

在大事件项目的第一步，我们需要认识一个包管理器pnpm，它是一个快速、节省空间的包管理器，类似于npm和yarn。它通过硬链接和符号链接来共享依赖包，从而节省磁盘空间和提高安装速度。后续我们都使用pnpm来管理。

![alt text](image-365.png)

## 配置ES-lint 和 Prettier

这里面的配置和pdf中的不太一样，因为现在软件包在不断的更新迭代。在我的版本下，和视频中不同，我们需要同时安装vs-code里的 ESLint 和 Prettier 插件，并全部启用它。

其中对于ES-Lint的配置如下（用于vscode配置文件`settings.json`）：

```json
// 保存时自动修复ESlint
"editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
},
// 关闭保存自动格式化
"editor.formatOnSave": false
```

此外，对于项目目录下的`.prettierc.json`文件进行如下配置：

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none",
  "endOfLine": "auto"
}
```

在执行最后一个配置前，我们要先确保项目中安装了`eslint-config-prettier`和`eslint-plugin-prettier`包。最后还要配置一个`eslint.config.js`文件，它也在项目根目录下：

```js
// 首先导入相应的包
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

// 其次在defineConfig的最末尾添加上下面的配置：
  prettier,

  // 确保最终生效（覆盖掉 skipFormatting 的关闭）
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
        }
      ],
      'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
      // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
      'no-undef': 'error'
    }
  }
```

配置完成之后，ES lint 和 Prettier 就可以协同工作了，自动修复并展示我们的代码格式问题。

## 提交前做代码检查

但是有的时候，我们没法避开就是写错了代码，没有注意格式问题，一旦提交了上去，可能会导致严重的后果。这个时候我们可以使用`husky`和`lint-staged`来在提交代码前进行代码检查和格式化。这样子可以确保我们提交的代码符合规范，避免一些低级错误。

![alt text](image-366.png)

但是正如图中所说，`pnpm lint`是一个全量检查，会检查仓库下所有的代码，十分耗时。因此我们可以改用`lint-staged`来进行代码检查和格式化。它只会检查我们本次提交的代码，速度更快。

![alt text](image-367.png)

## Vue-router 4 路由代码解析

在Vue3中，我们用的是Vue-router 4版本，和Vue-router 3版本有些许不同。主要发生了如下图所示的变化：

![alt text](image-363.png)

![alt text](image-364.png)

除此之外呢，`import.meta.env`是Vite提供的一个环境变量对象，用于在代码中访问环境变量。具体如何修改，参见图中文档地址。

## 引入 element-ui 组件库

这一步旨在加入element-plus组件。我们为了节省打包大小，使用按需导入。详细配置方法参看完整笔记。

需要关注的是，一旦引入了`unplugin-vue-components`这个插件，那么`src/components`文件夹下面的组件就不需要再手动引入，会被自动导入，直接在模板中使用即可。

## Pinia 构建仓库和持久化

用Pinia构建仓库，很简单不用说，但是持久化的话，我们需要再安装一个`pinia-plugin-persistedstate`插件。

https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/ 这里面有详细的配置说明，因此不再赘述。

## Pinia 仓库统一管理

在管理Pinia仓库时，我们希望做到：
1. Pinia独立维护：将原目录`main.js`包含Pinia的相关代码全都存储到`store/index.js`中
2. 仓库统一导出

![alt text](image-368.png)

实现方法如上图所示，下面说说具体细节：

1. 在`stores`文件夹下面新建`index.js`文件，作为Pinia的统一出口。接着将`main.js`中关于Pinia的相关代码全部搬到`stores/index.js`中。

```js
// stores/index.js
// 请注意，假设我们在这里使用了持久化插件
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
```
```js
// main.js
// ...
import pinia from '@/stores'
// ...
app.use(pinia)
```

2. 实现仓库的统一导出。现在我们需要在`stores`文件夹下新建一个`modules`文件夹，然后在该文件夹中创建不同的模块文件，比如说`counter.js`。然后，在`stores/index.js`中对这些文件进行注册。有下面几种方式

```js
// stores/index.js
// 方式一：手动按需导入和注册
// ...
import { useCounterStore } from './modules/counter'
export { useCounterStore }
```

```js
// stores/index.js
// 方式二：全部导出
// ...
export * from './modules/counter'  // 这一句话顶上面这种方式的两句话，并且还要强大，因为它可以将counter.js下面的所有Store都全部导出
```

至此，我们实现了Pinia仓库的统一管理。

## 配置axios

为了配置后面的一些路由，以及与后端进行数据交互，我们需要在项目里配置好axios。**一般的项目开发中，都会将axios封装成一个插件，以便在整个项目中使用**。一般呢，我们会配置下面的一些选项：

![alt text](image-369.png)

先安装axios：

```bash
pnpm add axios
```

详细的配置方法见原笔记。

## 首页整体路由设计

配置完了上面的东西后，我们需要对整个网站的页面之间的逻辑列个框架，而不是说就直接开始写代码。这个时候我们会需要对整体路由进行设计。

![alt text](image-370.png)

个人感觉这个其实是需求分析里面的一些内容。

## 构建登录注册页面

对于该页面的静态结构，我们使用element-plus来搭建，会使用到里面的一些图标库和组件。我们需要安装element-plus图标库：

```bash
pnpm i @element-plus/icons-vue
```

接着，按照完整笔记以及element-plus官网的说明，可以配置好静态的登录注册页面。接下来我们配置注册页的一些规则，也就是实现**注册校验**。

有时候我们要保证输入的用户名和密码是不是符合相应的一些规则。比如说，用户名必须是字母开头，长度在3到10之间，只能包含字母和数字；密码必须包含数字、字母和特殊字符，长度在6到12之间。这就需要通过注册校验来完成。

实现注册校验，我们需要绑定下面四步，现在分别来实现：

- ①model 属性绑定 form 数据对象
- ②v-model 绑定 form 数据对象的子属性
- ③rules 配置校验规则
- ④prop 绑定校验规则

下面来给出具体实现方法：

1. model 属性绑定 form 数据对象

```jsx
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

<el-form :model="formModel" >
```

2. v-model 绑定 form 数据对象的子属性

```jsx
<el-input
  v-model="formModel.username"
  :prefix-icon="User"
  placeholder="请输入用户名"
></el-input>
... 
(其他两个也要绑定)
```

3. rules 配置校验规则

```jsx
<el-form :rules="rules" >
    
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
```

4. prop 绑定校验规则

```jsx
<el-form-item prop="username">
  <el-input
    v-model="formModel.username"
    :prefix-icon="User"
    placeholder="请输入用户名"
  ></el-input>
</el-form-item>
... 
(其他两个也要绑定prop)
```

## 注册前的预校验

在用户点击注册按钮时，我们需要先对用户输入的数据进行预校验，确保数据符合要求后，才能发送注册请求。我们可以通过调用element-plus的`validate`方法来实现预校验。

1. 通过 ref 获取到 表单组件

```jsx
const form = ref()

<el-form ref="form">
```

2. 注册之前进行校验

```jsx
<el-button
  @click="register"
  class="button"
  type="primary"
  auto-insert-space
>
  注册
</el-button>

const register = async () => {
  await form.value.validate()
  console.log('开始注册请求')
}
```

注意，之所以要通过`ref`获取到表单组件，是因为`validate`方法在element-plus中是表单组件提供的一个方法，我们需要通过组件实例来调用它，从而获取到我们待会儿需要判断是否输入正确的表单组件。

而在`register`方法中，通过`form.value`是因为之前我们在学`ref`时说过，如果直接用`form`访问那么它是一个对象，只有加上`.value`属性才是我们需要的真实数据。

另外，我们之所以需要加上`await`，是因为`validate`方法element-plus所预定义的是一个异步方法，它会返回一个Promise对象。如果成功，就会执行后面的代码，而如果失败，则会以它独有的提示告诉你，你输入的信息和要求的不匹配，如下所示：

![alt text](image-371.png)

上面的三点都是视频里没有的，在这里写下加深一些印象。

## 封装api实现注册功能

这一步只有一个地方要说，就是怎么去忽略ElMessage的vscode飘红问题（因为我配置的是按需导入的element-plus组件，vscode则会认为我没有导入相应的组件）。旧的文档的项目结构比较老，而我的项目结构比较新，在询问AI之后给出了答复：

把全局变量加入 flat 配置的 languageOptions.globals 即可。修改 `eslint.config.js` 中对应块，示例改动如下：

```javascript
// ...existing code...
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  },
// ...existing code...
```

另外还有一个特别要注意的点，如果我们写了按需导入，那么就不要再在相应文件里写`import xxx from 'element-plus'`了，这样反而会导致按需导入的效果不起作用。比如我们之前用到了`ElMessage`，如果你在文件的开头又写了`import { ElMessage } from 'element-plus'`，这样就会导致原来的效果无法渲染。

## 登录访问拦截

在用户访问需要登录才能访问的页面时，我们需要先检查用户是否已经登录。如果没有登录，则重定向到登录页面。这部分的知识点我们参考vue-router导航守卫的知识。

下面的代码我们需要加在`router/index.js`中：

```jsx
// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})
```

## 用户退出

这一部分我们了解了两个element-plus小功能，`el-dropdown`和`ElMessageBox.confirm`。前者用于实现下拉菜单，后者用于实现弹出确认框。详细信息参见官方文档就可以。

## 基本架子 - PageContainer 组件

这部分内容在实际编写的时候要注意两点：

1. `<el-card>`组件里面会有`<template #header>`这种用法，这是因为`el-card`组件提供了一个具名插槽`header`，用于自定义卡片的头部内容。通过这种方式，我们可以将自定义的头部内容插入到`el-card`组件的指定位置，从而实现更灵活的布局和样式，同理还有脚部组件`#footer`。**至于具体的实现方式，你是无法在外部看到的，因此一开始的时候我很疑惑为什么可以这么写**。

2. 我们之前在配置element-plus的时候，配置了按需导入，安装了`unplugin-vue-components`这个插件，这个插件会把`src/components`文件夹下面的组件自动导入注册，因此我们在使用`PageContainer`组件时，不需要再手动引入，直接在模板中使用即可。

## 文章分类渲染

这一部分主要学习了element-plus的`el-table`组件的使用方法，以及给某个组件添加一个`v-loading`效果，让它在加载时可以转圈。

## 文章分类添加编辑 [element-plus 弹层]

需要注意一个地方，我们在把`ChannelEdit`组件剥离出去后，由于我们是在子模块下面定义的该组件，而不是在`src/components`下面定义的，因此`unplugin-vue-components`插件是无法自动导入注册该组件的，我们需要手动引入并注册该组件，才能在父组件中使用它。**而对于这种单文件组件的注册方式，我们要写成默认导入，而不能是命名导入**：

```jsx
import ChannelEdit from './components/ChannelEdit.vue'  // 正确写法，默认导入
// import { ChannelEdit } from './components/ChannelEdit.vue'  // 错误写法，命名导入
```

此外，这里的通过ref绑定实际上是模板引用的语法，有些忘记，应该再回顾一下。绑定完成之后，通过`dialog.value`就可以成功取到DOM对象以及其方法。子组件往父组件暴露方法要使用`defineExpose`编译器宏，这个也再回顾一下。

## 文章分类删除

这里的删除接口，由于后端的参数是Query，而不是Body，因此我们需要通过`params`来传递参数，而不是通过`data`来传递参数。

`request.post(url, data)` 和 `request.put(url, data)` 会把第二个参数作为请求体（body）发送，适用于后端要求从 body 读取的接口（例如新增/编辑）

在删除前可以跳出一个消息提示对话框，这里我们使用了`ElMessageBox.confirm`来实现，具体可以参考官方文档与详细笔记。

## 文章管理——静态结构

这里的有一个地方和视频中不一样，`<el-form inline>`在此时的element-plus版本中是不会自动调整宽度了，我们要手动写一个css设置它的宽度：

```jsx
<style lang="scss" scoped>
.el-select {
  width: 240px;
}
</style>
```

![alt text](image-372.png)

上图为官方注解。

另外，因为我们目前没有给`<el-select>`绑定`v-model`，所以它目前没有办法显示我们当前到底选中了哪一个。

### 文章分类选择

**这一部分涉及组件的代码中，我个人认为编写的十分晦涩繁琐，多次在父和子之间调来调去，个人认为实现起来还是有难度**。
