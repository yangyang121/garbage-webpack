export interface IRequest {
  url: string
  cb?: (data: any) => void
}

// 洗牌算法
export const shuffleKeyboard = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let i = arr.length - 1
  while (i > 0) {
    const changeNum = Math.floor(Math.random() * (i - 1))
    ;[arr[i], arr[changeNum]] = [arr[changeNum], arr[i]]
    i--
  }
  return arr
}

const mockRequest = (url: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ response: url })
    }, Math.floor(Math.random() * 10) * 1000)
  })

export const limitRequest = (
  limit: number,
  requestArr: IRequest[],
  completeFn?: Function
) => {
  let index = 0
  let completeIndex = 0
  const handleRequest = (data: IRequest) => {
    mockRequest(data.url).then((res) => {
      completeIndex++
      data.cb && data.cb(res)
      index < requestArr.length && handleRequest(requestArr[index++])
      if (completeIndex === requestArr.length && completeFn) {
        completeFn()
      }
    })
  }
  while (index < Math.min(limit, requestArr.length)) {
    handleRequest(requestArr[index++])
  }
}

type UniversalObject = {
  [propname: string]: string
}

export const printf = (str: string, obj: UniversalObject) => {
  let result = str
  let startIndex = result.indexOf("${")
  let endIndex = result.indexOf("}")
  while (startIndex > -1 && endIndex > -1) {
    result =
      result.slice(0, startIndex) +
      obj[result.slice(startIndex + 2, endIndex)] +
      result.slice(endIndex + 1)
    startIndex = result.indexOf("${")
    endIndex = result.indexOf("}")
  }

  console.log(result)
}

const numToWord = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
const numToQuantile = ["", "十", "百", "千"]
const numToBigQuantile = ["", "万", "亿"]

export const convertToRMB = (count: number) => {
  const str = String(count)
  let result = ""
  const len = str.length

  for (let i = 0; i < len; i++) {
    result +=
      Number(str[i]) === 0
        ? result[result.length - 1] === "零"
          ? ""
          : "零"
        : numToWord[Number(str[i])] + numToQuantile[(len - i - 1) % 4]
    if ((len - i - 1) % 4 === 0) {
      if (result[result.length - 1] === "零") result = result.slice(0, -1)
      result += numToBigQuantile[(len - i - 1) / 4]
    }
  }

  if (count % 100 === 0) {
    result += "元整"
  } else {
    result += "元"
  }

  console.log(result)
  return result
}

export const summaryRanges = (arr: number[]) => {
  if (arr.length <= 1) return arr
  let start = 0
  let end = 0
  let temp = 0
  const result: string[] = []
  while (end < arr.length) {
    temp = arr[end++]
    if (arr[end] - temp !== 1) {
      if (end - start === 1) {
        result.push(arr[start].toString())
      } else {
        result.push(`${arr[start]}->${temp}`)
      }
      start = end
    }
  }
  return result
}

// topK 的两种解法，即堆和快排思想
class MinHeap {
  private container: number[]
  constructor(arr: number[]) {
    this.container = []
    arr.forEach((item) => this.insert(item))
  }

  insert(data: number) {
    const { container } = this
    container.push(data)
    let index = container.length - 1
    let parent = (index - 1) >> 1
    while (index) {
      if (container[index] >= container[parent]) break
      ;[container[index], container[parent]] = [
        container[parent],
        container[index],
      ]
      index = parent
      parent = (index - 1) >> 1
    }
  }

  extract() {
    const { container } = this
    if (!container.length) return null
    ;[container[0], container[container.length - 1]] = [
      container[container.length - 1],
      container[0],
    ]
    const ans = container.pop()
    let index = 0
    let exchange = index * 2 + 1
    while (exchange < container.length) {
      let right = index * 2 + 2
      if (right < container.length && container[right] <= container[exchange]) {
        exchange = right
      }
      if (container[exchange] > container[index]) break
      ;[container[index], container[exchange]] = [
        container[exchange],
        container[index],
      ]
      index = exchange
      exchange = index * 2 + 1
    }
    return ans
  }

  top() {
    if (this.container.length) return this.container[0]
    return null
  }

  getContainer() {
    return this.container
  }
}

class MaxHeap {
  private container: number[]
  constructor(arr: number[]) {
    this.container = []
    arr.forEach((item) => this.insert(item))
  }

  insert(data: number) {
    const { container } = this
    container.push(data)
    let index = container.length - 1
    let parent = (index - 1) >> 1
    while (index) {
      if (container[index] <= container[parent]) break
      ;[container[index], container[parent]] = [
        container[parent],
        container[index],
      ]
      index = parent
      parent = (index - 1) >> 1
    }
  }

  extract() {
    const { container } = this
    if (!container.length) return null
    ;[container[0], container[container.length - 1]] = [
      container[container.length - 1],
      container[0],
    ]
    const ans = container.pop()
    let index = 0
    let exchange = index * 2 + 1
    while (exchange < container.length) {
      let right = index * 2 + 2
      if (right < container.length && container[right] > container[exchange]) {
        exchange = right
      }
      if (container[exchange] <= container[index]) break
      ;[container[index], container[exchange]] = [
        container[exchange],
        container[index],
      ]
      index = exchange
      exchange = index * 2 + 1
    }
    return ans
  }

  top() {
    if (this.container.length) return this.container[0]
    return null
  }

  getContainer() {
    return this.container
  }
}

export const topKMaxHeap = (arr: number[], k: number, isSmall = true) => {
  const length = arr.length
  if (k >= length) {
    return arr
  }

  const heap = isSmall
    ? new MaxHeap(arr.slice(0, k))
    : new MinHeap(arr.slice(0, k))
  for (let i = k; i < length; i++) {
    const top = heap.top()
    if (top && (isSmall ? top > arr[i] : top < arr[i])) {
      heap.extract()
      heap.insert(arr[i])
    }
  }
  console.log(heap.getContainer())
  return heap.getContainer()
}

function partition(arr: number[], left: number, right: number): number {
  const x = arr[left]
  let i = left
  let j = right
  while (i < j) {
    while (i < j && arr[j] > x) {
      j--
    }
    if (i < j) arr[i] = arr[j]
    while (i < j && arr[i] < x) {
      i++
    }
    if (i < j) arr[j] = arr[i]
  }
  arr[i] = x

  return i
}

export const topKQuickSort = (arr: number[], k: number) => {
  let left = 0
  let right = arr.length - 1
  let index = partition(arr, left, right)
  while (index !== k) {
    if (index < k) {
      left = index + 1
    } else if (index > k) {
      right = index - 1
    }
    index = partition(arr, left, right)
  }
  console.log(arr)
  return arr.slice(0, k)
}

export const expand = (obj: any) => {
  const ans: any = {}
  function dfs(data: any, path: string) {
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          dfs(data[i], `${path}[${i}]`)
        }
      } else {
        for (let key in data) {
          dfs(data[key], `${path ? path + "." : path}${key}`)
        }
      }
    } else {
      ans[path] = data
    }
  }
  dfs(obj, "")
  console.log(ans)
}
