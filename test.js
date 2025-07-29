const arr = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, arr);  // 使用apply方法求最大值
console.log(max);  // 输出：5