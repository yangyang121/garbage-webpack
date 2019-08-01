export default function() {
  const [a, b] = [1, 2]
  const fn = (a, b, ...rest) => a + b + rest[0]
  const result = fn(a, b, 7)
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const resultArr = arr.map(item => {
    if (item === result) {
      return item * 2
    }
    return item
  })
  return resultArr
}
