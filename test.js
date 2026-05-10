console.log('代码1：会执行') // ✅ 执行成功
console.log('代码2：会执行') // ✅ 执行成功

const obj = null
obj.method() // ❌ 运行时错误：Cannot read properties of null

console.log('代码3：不会执行') // ❌ 因为上面出错了，停止执行

// 结果：前两行会输出，然后报错，第三行不会执行
