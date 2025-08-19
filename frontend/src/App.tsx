import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

function App() {

  const [message,setMessage] = useState('')
  const [messages,setMessages] = useState<string[]>([])
  const [connectedUser,setConnectedUser] = useState<Socket>();
  useEffect(()=> {
    const socket = io('http://localhost:8000')

    socket.on('connect',()=> {
      setConnectedUser(socket)
    })


    socket.on('receive-message',(message:string)=> {
      console.log("received message",message);
      
      setMessages((prev:string[])=> ([...prev,message]))
    });

    // socket.emit('message',message);

    return () => {
      socket.disconnect()
    }

  },[])

  const handleSubmit = (e:any) => {
    e.preventDefault();

    connectedUser?.emit('message',message);

    setMessage('')

  }

  return (
    <>
    <h1>Chat App</h1>
    <h2>Client Id: {connectedUser && connectedUser.id}</h2>
    <form onSubmit={handleSubmit}>
      <input type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      />
    <button type='submit'>Send</button>
    </form>

    <div>
      {messages.map((message)=> (<span>
        {message}
      </span>))}
    </div>
    </>
  )
}

export default App
