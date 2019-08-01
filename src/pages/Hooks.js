import React, { useState, useEffect, useRef } from "react"

export default function() {
  const [count, setCount] = useState(0)
  const latestCount = useRef(count)

  useEffect(() => {
    latestCount.current = count
    setTimeout(() => {
      console.log(`You clicked ${count} times`)
      // 模拟class componentDidUpdate
      console.log(`You clicked ${latestCount.current} times`)
    }, 3000)
  })

  const handleShowAlert = () => {
    setTimeout(() => alert(count), 3000)
  }

  return (
    <>
      <h2>Click times{count}</h2>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleShowAlert}>Show alert</button>
    </>
  )
}
