import React from "react"

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
  setTimeout(() => resolve(2), 1000)
})

const promise2 = new Promise((resolve, reject) => {
  console.log(3)
  setTimeout(() => resolve(4), 2000)
})

function allPromise(...promiseArr) {
  if (promiseArr.length === 0) return
  return Promise.all(promiseArr)
}

async function asycnAllPromise() {
  const promiseResult = await allPromise(promise1, promise2)
  console.log(promiseResult)
}

export default function() {
  return <div>Home</div>
}
