const baseUrl = "/mock/5d1c9ecc839270250e11c630/example"

export const request = url => fetch(baseUrl + url).then(res => res.json())

// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
const flatArray = arr =>
  arr.reduce(
    (prev, next) =>
      Array.isArray(next) ? [...prev, ...flatArray(next)] : [...prev, next],
    []
  )

export const flatSortArray = data => {
  const flatData = flatArray(data)
  // const flatData = data.flat(Infinity)
  const result = Array.from(new Set(flatData)).sort((a, b) => a - b)
  console.log(result)
}

export const toTree = arr => {
  const map = {}
  arr.forEach(element => {
    map[element.id] = element
  })
  const result = []
  arr.forEach(item => {
    const parent = map[item.pid]
    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = []
      }
      parent.children.push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// 深度优先遍历
export const deepMap = (data, result = []) => {
  result.push(data.content)
  if (data.children) {
    data.children.forEach(element => {
      deepMap(element, result)
    })
  }
  return result
}

// 广度遍历
export const wideMap = data => {
  const result = []
  const queue = []
  queue.push(data)
  while (queue.length !== 0) {
    const item = queue.shift()
    result.push(item.content)
    const children = item.children || []
    for (let i = 0; i < children.length; i++) {
      queue.push(children[i])
    }
  }
  return result
}

export const debounce = (fn, delay, immediate) => {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      callNow && fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

export const throttle = (fn, delay, type) => {
  let start = 0
  let timer = null
  return function(...args) {
    if (type === 1) {
      const now = Date.now()
      if (now - start > delay) {
        fn.apply(this, args)
        start = now
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args)
          timer = null
        }, delay)
      }
    }
  }
}

export const _new = (fn, ...rest) => {
  const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, rest)
  return ret instanceof Object ? ret : obj
}

export const _instanceof = (left, right) => {
  const o = right.prototype
  let l = left._proto_
  while (true) {
    if (l === null) return false
    if (l === o) return true
    l = l._proto_ 
  }
}

Function.prototype.myCall = function(obj, ...rest) {
  obj._fn_ = this
  const val = obj._fn_(...rest)
  delete obj._fn_
  return val
}

Function.prototype.myApply = function(obj, rest) {
  obj._fn_ = this
  const val = obj._fn_(...rest)
  delete obj._fn_
  return val
}

Function.prototype.myBind = function(obj, ...args1) {
  return (...args2) => {
    const args = args1.concat(args2)
    obj._fn_ = this
    const val = obj._fn_(...args)
    delete obj._fn_
    return val
  }
}
