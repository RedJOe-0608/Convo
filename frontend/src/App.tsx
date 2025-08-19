import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=> {
    const socket = io('http://localhost:8000')
    
  },[])

  return (
    <>
    <h1>Chat App</h1>
    </>
  )
}

export default App
