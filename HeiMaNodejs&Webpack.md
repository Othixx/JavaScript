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

## 5 优化打包css代码

![alt text](image-190.png)

使用`mini-css-extract-plugin`插件来优化打包后的CSS代码。这个插件可以将CSS代码提取到单独的文件中，而不是将其嵌入到JavaScript文件中。具体使用方法见官方文档。**这个插件不要和`style-loader`一起使用。**

![alt text](image-191.png)

此外，刚才我们打包的代码没有被进行压缩，可以配合`css-minimizer-webpack-plugin`插件来进行压缩。

此外，如果要打包less代码，还需要安装`less-loader`这个加载器。具体查看官方文档。

## 6 打包图片

Webpack5内置了资源模块，可以直接打包图片，不需要再额外引入其他的loader。

![alt text](image-192.png)

默认情况下，大于8kb的图片会被打包成一个单独的文件，并且会生成一个哈希值作为文件名的一部分。小于8kb的图片会被转换为Base64编码，直接嵌入到打包后的JavaScript文件中。因为直接转换会增加打包后的文件体积，这对于大图片来说不利，而对小图片打包，可以减少一次HTTP请求，最终加快网页访问速度。

## 7 搭建开发环境

在开发环境中，我们通常需要热更新功能，这样可以在代码修改后自动刷新浏览器，而不需要手动刷新。Webpack提供了`webpack-dev-server`来实现这个功能。

![alt text](image-193.png)

配置完成后，当我用`npm run dev`命令启动开发服务器时，Webpack会自动打开浏览器，**默认打开的是当前项目下的`public`文件夹**。至于为什么会这样呢，是因为在引入`webpack-dev-server`官方文档的代码时，也在`webpack.config.js`文件中配置了`devServer`的相关选项，详细浏览`devServer`的官方文档就可以知道。

## 8 两种打包模式

Webpack提供了两种打包模式：开发模式和生产模式。开发模式主要用于开发阶段，提供了更好的调试体验，而生产模式则用于发布阶段，优化了打包后的代码。

![alt text](image-194.png)

此外，如果我们要在不同的模式下使用不同的包，可以有三种方式，视频里讲的是cross-env这个包：

![alt text](image-195.png)

请注意，如果我们使用`cross-env`这个包来设置环境变量，会给Node.js环境的`process.env`对象添加属性，而这些属性在前端代码中是无法直接访问的。

## 9 往前端中注入环境变量

正如刚才的开发模式和生产模式一样，有的代码我们只需要在开发模式下运行，在生产模式下我们不希望它运行。而刚才的`cross-env`的环境变量只能作用在Node.js环境下，并不能作用到前端中，该怎么办呢？Webpack提供了`DefinePlugin`插件，可以在打包时向前端代码中注入环境变量。这样可以在前端代码中使用这些变量，而不需要在代码中硬编码。

![alt text](image-196.png)

## 10 开发环境调错

![alt text](image-197.png)

在开发环境中，我们通常需要调试代码，Webpack提供了`source-map`来帮助我们调试代码。`source-map`可以将打包后的代码映射回原始代码，这样我们就可以在浏览器的开发者工具中查看原始代码，而不是打包后的代码，方便我们查错。

请注意，`source-map`不要在生产环境中使用，一是会增大文件体积，二是会暴露源代码，可能会导致安全问题。而如果要实现这一点，在生产模式中又不需要添加`devtool: 'inline-source-map'`这一段代码，可以通过下面的方式迂回实现：

![alt text](image-198.png)

## 11 路径别名

Webpack允许我们为模块路径设置别名，这样可以简化模块的导入路径。我们可以在`webpack.config.js`文件中配置`resolve.alias`来实现这一点。

![alt text](image-199.png)

## 12 使用CDN

![alt text](image-200.png)

上面这幅图是个综述，我们再来详细分析下面的这些部分：

![alt text](image-201.png)
这段代码是段使用模板引擎编写的代码，我也不知道为什么会这样写，反正拿来这样用就行。

![alt text](image-202.png)
这幅图要知道里面的`key`和`value`应该写哪些。

## 13 多页面打包

![alt text](image-203.png)

这一部分还理解的不是很深刻。`chunks`写的是模块名就行。

## 14 分割公共代码

![alt text](image-204.png)

。。。