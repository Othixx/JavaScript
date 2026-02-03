const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class HMPromise {
  // 状态
  state = PENDING
  // 原因
  result = undefined
  // 回调函数数组
  #handlers = [] // [{onFulfilled,onRejected}...]

  // 构造函数
  constructor(func) {
    // pending->fulfilled
    const resolve = (result) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.result = result
        this.#handlers.forEach(({ onFulfilled }) => {
          onFulfilled(this.result)
        })
      }
    }

    // pending->rejected
    const reject = (result) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.result = result
        this.#handlers.forEach(({ onRejected }) => {
          onRejected(this.result)
        })
      }
    }

    try {
      func(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then方法
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (x) => x
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (x) => {
            throw x
          }

    const p2 = new HMPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        runAsynctask(() => {
          try {
            const x = onFulfilled(this.result)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.state === REJECTED) {
        runAsynctask(() => {
          try {
            const x = onRejected(this.result)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.state === PENDING) {
        this.#handlers.push({
          onFulfilled: () => {
            runAsynctask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(p2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          },
          onRejected: () => {
            runAsynctask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(p2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          },
        })
      }
    })

    return p2
  }

  // catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // finally方法
  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  // 静态方法-resolve
  static resolve(value) {
    if (value instanceof HMPromise) {
      return value
    }
    return new HMPromise((resolve) => {
      resolve(value)
    })
  }

  // 静态方法-reject
  static reject(value) {
    return new HMPromise((undefined, reject) => {
      reject(value)
    })
  }

  // 静态方法-race
  static race(promises) {
    return new HMPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      promises.forEach((p) => {
        HMPromise.resolve(p).then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          },
        )
      })
    })
  }

  // 静态方法-all
  static all(promises) {
    return new HMPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      promises.length === 0 && resolve(promises)
      const results = []
      let count = 0
      promises.forEach((p, index) => {
        HMPromise.resolve(p).then(
          (res) => {
            results[index] = res
            count++
            count === promises.length && resolve(results)
          },
          (err) => {
            reject(err)
          },
        )
      })
    })
  }

  // 静态方法-allSettled
  static allSettled(promises) {
    return new HMPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      promises.length === 0 && resolve(promises)

      const results = []
      let count = 0
      promises.forEach((p, index) => {
        HMPromise.resolve(p).then(
          (res) => {
            results[index] = { status: FULFILLED, value: res }
            count++
            count === promises.length && resolve(results)
          },
          (err) => {
            results[index] = { status: REJECTED, reason: err }
            count++
            count === promises.length && resolve(results)
          },
        )
      })
    })
  }

  // 静态方法-any
  static any(promises) {
    return new HMPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      promises.length === 0 &&
        reject(new AggregateError(promises, 'All promises were rejected'))

      const errors = []
      let count = 0
      promises.forEach((p, index) => {
        HMPromise.resolve(p).then(
          (res) => {
            resolve(res)
          },
          (err) => {
            errors[index] = err
            count++
            count === promises.length &&
              reject(new AggregateError(errors, 'All promises were rejected'))
          },
        )
      })
    })
  }
}

function runAsynctask(callback) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback)
  } else if (typeof MutationObserver === 'function') {
    const obs = new MutationObserver(callback)
    const divNode = document.createElement('div')
    obs.observe(divNode, { childList: true })
    divNode.innerText = 'itheima666'
  } else {
    setTimeout(callback, 0)
  }
}

// function resolvePromise(p2, x, resolve, reject) {
//   if (x === p2) {
//     throw new TypeError('Chaining cycle detected for promise #<Promise>')
//   }
//   if (x instanceof HMPromise) {
//     x.then(res => resolve(res), err => reject(err))
//   } else {
//     resolve(x)
//   }
// }

// 符合Promise\A规范(考虑了各种边界情况)
function resolvePromise(p2, x, resolve, reject) {
  // 2.3.3.1 如果p2和x引用同一个对象,通过TypeError作为原因来拒绝pormise
  if (x === p2) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  /**
   * 2.3.3.2 如果x是一个promise,采用他的状态
   *  2.3.3.3.1 如果x是pengding状态,promise必须保持等待状态,直到x被fulfilled或rejected
   *  2.3.3.3.2 如果x是fulfilled状态,用相同的原因解决promise
   *  2.3.3.3.3 如果x是rejected状态,用相同的原因拒绝promise
   * */
  if (x instanceof HMPromise) {
    x.then((y) => {
      resolvePromise(p2, y, resolve, reject)
    }, reject)
  }
  // 2.3.3 如果x是一个对象或者函数
  else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3.1 让then成为x.then
    try {
      var then = x.then
    } catch (e) {
      // 2.3.3.2 如果检索属性x.then抛出了异常e，用e作为原因拒绝promise
      return reject(e)
    }

    /**
     * 2.3.3.3  如果then是一个函数，通过call调用他,并且将x作为他的this(参数1)
     * 调用then时传入2个回调函数:
     *    第一个参数叫做resolvePromise(对应到的参数2)
     *    第二个参数叫做rejectPromise(对应到参数3)
     * */

    if (typeof then === 'function') {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者同一参数被调用了多次，只采用第一次调用,后续的调用会被忽略(观察called后续的赋值+判断)
      let called = false
      try {
        then.call(
          x,
          // 2.3.3.3.1 如果 resolvePromise 以 成功原因 y 为参数被调用，继续执行 resolvePromise
          (y) => {
            if (called) return
            called = true
            resolvePromise(p2, y, resolve, reject)
          },
          // 2.3.3.3.2 如果 rejectPromise 以拒绝原因 r 为参数被调用，用 r 拒绝 promise
          (r) => {
            if (called) return
            called = true
            reject(r)
          },
        )
      } catch (e) {
        // 2.3.3.3.4 如果调用then抛出异常
        // 2.3.3.3.4.1 如果resolvePromise或rejectPromise已经被调用，忽略它
        if (called) return
        called = true

        // 2.3.3.3.4.2 否则以 e 作为拒绝原因 拒绝promise
        reject(e)
      }
    } else {
      // 2.3.3.4 如果then不是函数，用 x 作为原因 兑现promise
      resolve(x)
    }
  } else {
    // 2.3.4 如果then不是对象或函数，用 x 作为原因 兑现promise
    return resolve(x)
  }
}

module.exports = {
  deferred() {
    const res = {}
    res.promise = new HMPromise((resolve, reject) => {
      res.resolve = resolve
      res.reject = reject
    })
    return res
  },
}
