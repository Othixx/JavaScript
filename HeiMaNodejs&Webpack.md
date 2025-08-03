# 1 Node.js 篇

## 1 Node.js 介绍

![alt text](bac4d667d2e434f143342ee640168e60.jpg)
![alt text](db96b6a1c6cb4b508af55798dff8982d.jpg)

## 2 Node.js fs模块写入读取文件

![alt text](e96bed333d2567fc92a7fb36e3e7bcab.jpg)
![alt text](image-173.png)

## 3 path 模块与路径问题

Node.js 在执行代码时，''./''是按照当前终端所在的文件夹下来算的。为了方便，我们可以使用path模块配上`__dirname`来直接输出当前js文件所在的文件夹的绝对路径，便于后期代码执行：

![alt text](image-174.png)

## 4 Node.js http 模块创建Web服务程序

先创建一个`server`，然后调用`server.on`打开`server`配置服务，在里面设置响应头和返回的信息，最后配置监听端口号。

![alt text](37786315a9188591ec96439b8a998f44.jpg)

## 5 Node.js 模块化 - Common JS 标准

在Node.js中，需要使用的每个文件都是独立的，被称为不同的模块，他们之间作用域不同。需要使用这些模块时，用特定的Common JS语法进行导入导出。

![alt text](9dc3b8c7272518f8f299f76e134073d8.jpg)
![alt text](d0f1bc86fdd64312560f87aef4f79396.jpg)

## 6 Node.js 模块化 - ECMAScript 标准默认导入导出

![alt text](image-175.png)

我们除了在设置如上图所示的代码之外，还需要在待执行代码的根目录中创建一个`package.json`文件，并在其中添加以下内容：

```json
{
  "type": "module"
}
```

这样导入导出语句才能够正确被Node.js识别。

![alt text](image-176.png)

## 7 Node.js 模块化 - ECMAScript 标准命名导入导出

**命名导入导出和默认导入导出可以同时用**。如何选择看一个需求是需要全部加载一个模块还是部分加载一个模块。和之前的默认导入导出一样，也需要新建`package.json`文件并添加`"type": "module"`。

![alt text](image-177.png)

**通常来说，针对Node.js项目，我们使用Common JS 标准，而针对前端工程化项目，我们使用ECMAScript标准。**

## 8 包的概念

![alt text](image-179.png)
在上面的右下角的小图中，我们可以看到一个大文件夹包含了小文件夹，以及若干个代码文件。**一个代码文件就是一个模块**。而关于`package.json`文件的内容，我们具体可以看上图右上角，需要注意的是引入软件包时，它会优先查找软件包根目录下的`index.js`文件，如果没找到，再去查找`package.json`文件中`"main"`属性指定的入口文件。

在示例中，`index.js`集中了工具模块方法，统一向外暴露。
![alt text](image-180.png)
然后`server.js`可以直接引入`./utils`文件夹，调用软件包中的方法：
![alt text](image-181.png)

总结：

![alt text](image-178.png)

## 9 npm 软件包管理器

npm 是 Node.js 的包管理器，提供了一个在线的代码仓库，供开发者下载和使用开源的 Node.js 模块。

![alt text](image-182.png)

如果当前的项目文件夹下面没有`package.json`文件，需要通过命令`npm init -y`来初始化项目清单文件。
![alt text](image-183.png)

而如果你下载的是别人的项目，有`package.json`文件，直接使用`npm i`命令即可安装所有依赖包。

## 10 nodemon 与全局软件包

![alt text](image-184.png)

`nodemon`是一个用于Node.js应用程序的工具，它可以监视文件的变化，并在文件发生变化时自动重启应用程序。这样可以提高开发效率，避免手动重启服务器。

# 2 Webpack 篇

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。它会递归地构建一个依赖图，将应用程序需要的每个模块打包成一个或多个 bundle。**简而言之，它可以压缩你的代码，打包静态文件，从而实现前端工程化**。

## 1 Webpack 安装和基本使用

![alt text](image-185.png)

注释：加上`--save-dev`参数是为了将Webpack作为开发依赖安装，这样它不会被打包到生产环境中，同时我们在`package.json`里配置`build: "webpack"`命令时，执行`npm run build`时就会自动执行Webpack。

查看最后打包完的代码，非常简单，极致省内存。
![alt text](image-186.png)

## 2 修改 Webpack 打包入口和出口

其实就是在项目根目录下新建`webpack.config.js`文件，按照一定的标准进行配置。具体怎么做可以参看下面的图片以及官方文档。
![alt text](image-187.png)

## 3 Webpack 自动生成html文件

主要使用`html-webpack-plugin`这个插件。使用这个插件之后，Webpack会自动生成一个HTML文件，并将打包后的JavaScript文件自动插入到这个HTML文件中。
![alt text](image-188.png)

## 4 Webpack 打包css代码

使用`css-loader`和`style-loader`这两个**加载器**来处理CSS文件。`css-loader`用于解析CSS文件，`style-loader`用于将CSS代码插入到HTML文件中。

![alt text](image-189.png)
上图中的代码可以在官方文档中查阅。

