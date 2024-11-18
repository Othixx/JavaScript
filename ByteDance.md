# 3 深入理解CSS

## 3.1 深入理解CSS（上）

### 3.1.1 CSS 选择器的特异度

![26](./imgs/26.png)
![27](./imgs/27.png)

就像是数字比较大小一样，优先级：id >（伪）类 > 标签。数一下谁的特异度大就听谁的。

另外还有几种举例，看我之前整理好的八股。

### 3.1.2 CSS 继承

和文字相关的属性一般都是可以继承的，和盒模型相关的属性一般不可继承。如果我要让一个元素的某个不能继承的属性继承，可以使用`inherit`关键字，这样子的操作叫做**显式继承**。

**显式继承：**

![28](./imgs/28.png)

### 3.1.3 CSS 求值过程解析

查了一下这个知识点好像面的时候似乎问的不太多，但是还是要了解一下。

**计算值和使用值的区别：**

![29](./imgs/29.png)

计算值：`computed value`。它是指浏览器在不进行实际布局的情况下，所得到的最具体的值。比如说60%。

使用值：`used value`。它将计算值进一步转换，比如把关键字、百分比都转为绝对值。

### 3.1.4 CSS 布局方式及相关技术

**常规流（文档流）、浮动、绝对定位**

对content设置百分数属性时，**容器有指定的高度时**，百分数才生效。

border 三种属性 四个方向：
![30](./imgs/30.png)

`margin:auto`可以实现水平居中，只需要左右的margin都为auto。

`margin collapse`现象。区块的**上下外边距**有时会合并（折叠）为单个边距，其大小为两个边距中的最大值，但**不包括**浮动和绝对定位的元素。

**标准盒模型和IE盒模型的区别**：IE盒模型的width包括了border和padding。其实很多时候我们还是用的IE盒模型多。

## 3.2 深入理解CSS（下）

![alt text](image-14.png)
![alt text](image.png)
![alt text](image-1.png)

### 3.2.1 CSS盒模型——块级元素

块级排版上下文 Block Formatting Context（BFC）：块级元素的排版规则。

### 3.2.2 CSS盒模型——行级元素

行级排版上下文 Inline Formatting Context（IFC）：行级元素的排版规则。

`overflow-wrap`属性：设置是否允许文本在单词内换行。

**请注意，行级元素和块级元素不能同时放。如果试图在一个行级元素中引入块级元素，那么行级元素会被拆开成两行，中间单独放置块级元素。如下例：**

![alt text](image-2.png)

看这个示例，`<span>`是行级元素，`<div>`是块级元素，所以`<span>`会被拆开成两行。同时有一个很有意思的点就是，第一行的`<span>`没有右边框，第二行的`<span>`没有左边框，这是因为`<span>`被拆开成两行，所以两行之间的边框是不会重叠的。

### 3.2.3 Flex 布局

![alt text](image-3.png)
![alt text](image-4.png)

`flex-direction`属性：决定flex容器的排列方向。

`justify-content`属性：定义了项目在主轴上的对齐方式。默认为`flex-start`，即左对齐。

`align-items`属性：定义了项目在侧轴上的对齐方式。默认为`stretch`，即拉伸。

![alt text](image-5.png)
![alt text](image-6.png)

注：`baseline`对齐方式，是指项目的第一行文字的基线对齐。

另外，Flex布局还有一个很重要的属性，就是`flex`属性。`flex`属性是`flex-grow`、`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。它们用来设置子项的弹性，当容器有剩余空间时，会伸展，容器空间不够时，会收缩。
![alt text](image-7.png)
![alt text](image-8.png)

### 3.2.4 Grid 布局

**Grid布局，又叫网格布局，是CSS的一个强大的布局武器。有了它之后几乎所有的的布局问题都被解决。**

**布局三步法：**
![alt text](image-11.png)

设置网格属性：
![alt text](image-12.png)

网格线：
![alt text](image-9.png)

划分网格的代码写法：
![alt text](image-10.png)

### 3.2.5 Float浮动

**现在用的不多了，主要就是图文混排。其他奇奇怪怪的问题都直接交给Flex和Grid去解决就可以。**

![alt text](image-15.png)

如图，设置`float: left`实现图片左对齐混排。

### 3.2.6 绝对定位

![alt text](image-18.png)
![alt text](image-16.png)
`position-absolute`：逐个寻找，找到最近的有定位属性的父元素，然后根据这个父元素来定位。**例子中，父元素为`html`。**

![alt text](image-17.png)
`position-fixed`：固定定位，元素相对于**浏览器窗口**固定位置。

# 4 如何写好JavaScript

写好JS代码，月影老师给我们归纳了**三大原则：各司其职、组件封装、过程抽象。**

自认为，月影老师的这一部分讲解的非常之深刻，在未来可以常看常新。

## 4.1 各司其职

意思就是，让HTML负责结构，CSS负责样式，JS负责行为。**应该尽量避免让JS直接操作CSS样式。**

例子引出：
![alt text](image-19.png)
写一段JS，控制一个网页，让它支持浅色和深色两种模式并实现切换，你会怎么做？

**方法一：直接通过JS来修改CSS的样式（不推荐）**

![alt text](image-20.png)
这种做法并不推荐，因为当同事在维护你的代码时，他不容易看出来这段代码的逻辑具体是实现一个什么需求的。而且如果老板给你了一个新需求，你直接修改样式，如果没有发现这一段JS代码，那么很可能需要debug很久，无法实现老板所需的央视需求。**这是因为没有做到“各司其责”，让JS做了CSS的事情。**

**方法二：通过JS来修改class类名（推荐），通过在类名中定义CSS来实现效果。**

**清楚明了。**
![alt text](image-21.png)
![alt text](image-22.png)

**方法三：0 JS方案（推荐）**

![alt text](image-23.png)
在HTML中定义一个`checkBox`来实现。这种办法十分巧妙，是最好的代码实现方式，不过我们在实际开发中也不强求，如果想到了就使用，如果没想到就算了。

## 4.2 组件封装

以轮播图为例。
https://juejin.cn/post/7000599679356534815

## 4.3 过程抽象

https://juejin.cn/post/7001033897878224926

**高阶函数那部分有点难，没怎么搞懂。**

*React Hooks的使用，就是一个很好的过程抽象的例子。

### 4.3.1 过程抽象/HOF高阶函数/装饰器

**高阶函数这个知识点面试会常考。** 为什么要用高阶函数？**中高级及以上的开发者基本上都会用，编写高阶函数比较值钱，但是仅仅调用高阶函数大家都会。**

![alt text](444b53df03255225ef9edc8ee36157a.png)

**HOF0等价范式**

高阶函数与纯函数的区别？

**纯函数、非纯函数：**
纯函数：相同的输入永远会得到相同的输出，而且没有副作用。非纯函数：会有副作用，比如修改了外部变量。**一个系统所用的非纯函数越多，系统的可维护性越差。**

iterative方法是对的，那么setcolors就是对的。

### 4.3.2 编程范式：命令式/声明式

![alt text](image-24.png)

JS混合式编程，既会命令式又会声明式。

## 4.4 案例讲解

代码优化的四大技术：**风格优先、保证正确、封装函数、妙用特性。**

### 4.4.1 封装函数 交通灯切换

最可行简单符合规范的方法是使用Promise。
https://juejin.cn/post/7002851081826861093

### 4.4.2 妙用特性 4的幂 LeetCode 342

妙用JS特性加速。https://juejin.cn/post/7003693349748244516

### 4.4.3 保证正确 洗牌、分红包

https://juejin.cn/post/7002122662168395812

# 5 深入浅出TypeScript

![alt text](image-30.png)

## 5.1 TS介绍

TS为我们带来了什么？简单来讲就是：①类型安全②下一代JS特性③更完善的工具链。下面分别介绍一下这三点。

1. 类型安全：类型安全是指在编程语言中，**变量和表达式的类型在编译时或运行时得到严格检查**，（而JS是弱类型语言）以确保它们的使用符合预期。这种检查可以防止类型错误，例如将字符串赋值给期望整数的变量，从而提高代码的健壮性和可靠性。类型安全的语言可以在编译阶段捕获许多潜在的错误，减少运行时错误的发生。
2. 下一代JS特性：TS是JS的超集，所以TS可以使用ES6、ES7等新特性。
3. **更完善的工具链**：TS提供了更完善的工具链，比如类型检查、代码提示、重构等。这一点最重要，这说明TS不仅仅是一个语言，更是一个生产力工具。

**TypeScript Playground: https://www.typescriptlang.org/zh/**

**Awesome TypeScript: https://github.com/dzharii/awesome-typescript#tools**

## 5.2 TS基础类型

TypeScript 提供了一些基础类型，用于在编写代码时进行类型检查：

- `boolean`：表示布尔值，只有 `true` 和 `false` 两个取值。
- `number`：表示数字，包括整数和浮点数。
- `string`：表示字符串类型。
- `enum`：枚举类型，用于定义一组命名常量。
- `any`：表示任意类型，关闭类型检查。
- `unknown`：表示未知类型，类似于 `any`，但更安全。
- `void`：表示没有任何类型，通常用于函数没有返回值的情况。
- `never`：表示永不存在的值的类型，例如抛出异常或无限循环的函数。

对比 JavaScript 的基本数据类型（区分大小写）：

- `Number`：表示数字类型。
- `String`：表示字符串类型。
- `Boolean`：表示布尔值类型。
- `Null`：表示空值。
- `Undefined`：表示未定义的值。
- `Symbol`：表示唯一的标识符（ES6 新增）。
- `BigInt`：表示大整数（ES10 新增）。

JavaScript 的引用数据类型包括：

- `Object`：表示对象类型，包括数组、函数等。

## 5.3 接口、函数重载、类与继承（类似Java）

### 5.3.1 接口

接口（Interface）是 TypeScript 中用于定义对象的类型。它可以用来描述对象的形状，确保对象具有特定的结构。接口可以定义属性和方法，并且可以通过 `implements` 关键字让类实现接口。

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}

class Student implements Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
```

### 5.3.2 函数重载

函数重载（Function Overloading）允许一个函数根据传入参数的不同而具有不同的实现。在 TypeScript 中，可以为同一个函数提供多个函数类型定义，以实现函数重载。

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    return a + b;
}

console.log(add(1, 2)); // 输出: 3
console.log(add('Hello, ', 'world!')); // 输出: Hello, world!
```

### 5.3.3 类与继承

类（Class）是 TypeScript 中用于创建对象的蓝图。类可以包含属性和方法，并且可以通过 `extends` 关键字实现继承。继承允许一个类继承另一个类的属性和方法，从而实现代码重用。

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog('Buddy');
dog.bark(); // 输出: Woof! Woof!
dog.move(10); // 输出: Buddy moved 10 meters.
```

通过接口、函数重载、类与继承，TypeScript 提供了强大的面向对象编程能力，使得代码更加结构化和可维护。

## 5.4 TS高级类型

TypeScript 提供了一些高级类型，使得开发者可以更灵活地定义和操作类型。这些高级类型包括：

### 5.4.1 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一。使用竖线 (`|`) 分隔每个类型。

```typescript
let value: string | number;
value = "Hello"; // 合法
value = 42; // 合法
// value = true; // 非法
```

### 5.4.2 交叉类型（Intersection Types）

```typescript
交叉类型表示将多个类型合并为一个类型。使用与 (&) 运算符连接每个类型。

interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type Staff = Person & Employee;

let staffMember: Staff = {
    name: "Alice",
    employeeId: 1234
};
```

### 5.4.3 类型断言（Type Assertions）

类型断言用于手动指定一个值的类型。它可以通过两种方式实现：尖括号语法和 as 语法。

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue2: any = "this is another string";
let strLength2: number = (someValue2 as string).length;
```

### 5.4.4 类型别名（Type Aliases）

类型别名用于为类型创建一个新名称。它可以用于原始值、联合类型、交叉类型以及任何你需要手动定义的类型。

```typescript
type StringOrNumber = string | number;

let value1: StringOrNumber;
value1 = "Hello"; // 合法
value1 = 42; // 合法
// value1 = true; // 非法
```

此外，在高级类型中，还有一个很重要的概念，那就是**泛型**。

### 5.4.5 泛型（Generics）

泛型（Generics）是 TypeScript 中的一种高级类型，用于在定义函数、类、接口时，支持多种类型。泛型可以增强代码的可重用性，使得代码更加灵活。

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Hello, TypeScript!");
console.log(output); // 输出: Hello, TypeScript!
```

![alt text](image-25.png)
![alt text](image-26.png)
![alt text](image-27.png)

## 5.5 TS实战

### 5.5.1 声明文件

![alt text](image-28.png)

### 5.5.2 泛型约束后端接口类型

![alt text](image-29.png)

# 6 Web标准与前端开发

**建议：学习框架前去了解一下他们的作者，搞清楚在什么情境之下写了这个框架。**

![alt text](image-31.png)
![alt text](image-32.png)
![alt text](image-33.png)

roadmap.sh 这个网站可以看一下。

![alt text](image-34.png)
![alt text](image-35.png)