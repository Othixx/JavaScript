// 防抖
// 名字叫做debounce，延迟时间为delay，调用函数为fn
function debounce(fn, delay) {
  let t = null
  return function () {
    if (t !== null) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
}

// 节流
// 名字叫做throttle，延迟时间和函数仍旧为delay和fn
function throttle(fn, delay) {
  let t = null
  return function () {
    if (t === null) {
      t = setTimeout(() => {
        fn.call(this)
        t = null
      }, delay)
    }
  }
}
