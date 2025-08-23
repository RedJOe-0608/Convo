import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from "uuid";
import type { MessageProps } from '../types/types';

const ChatWindow = () => {

     const [message,setMessage] = useState('')
  const [messages,setMessages] = useState<MessageProps[]>([])
  const [connectedUser,setConnectedUser] = useState<Socket>();
  const [online,setOnline] = useState(false);

  useEffect(()=> {
    const socket = io('http://localhost:8000')
    console.log(socket);
    
    socket.on('connect',()=> {
      setConnectedUser(socket)
      setOnline(true);
    })

    socket.on('disconnect',(reason)=>{
      console.log(`${connectedUser?.id} disconnected. Reason: ${reason}`);
      setOnline(false);
      
    })

    socket.on('receive-message',(message:string)=> {
      console.log("received message: ",message);
      
      setMessages(prev => {
    const updated = [...prev, { id: uuidv4(), text: message }];
    console.log("messages state:", updated);
    return updated;
  });
    });

    return () => {
      console.log(`${socket.id} disconnected`);
      
      socket.disconnect()
    }

  },[])

  const handleSubmit = (e:any) => {
    e.preventDefault();

    connectedUser?.emit('message',message);

    //show the message immediately on the sender UI.
    setMessages((prev:MessageProps[])=> ([...prev,{id: uuidv4(),text:message}]))

    setMessage('')

  }
  return (
    <div className="w-[95%] text-white p-8 rounded-l-2xl rounded-r-2xl flex bg-primary">
        <h1>Chat App</h1>
    <h2><span>{online ? "🟢" : "🔴" }</span> Client Id: {connectedUser && connectedUser.id}</h2>
    <form onSubmit={handleSubmit}>
      <input type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      />
    <button type='submit'>Send</button>
    </form>

       <div>
  {messages.map((message) => (
    <div key={message.id} style={{ display: "block", padding: "4px", borderBottom: "1px solid #eee" }}>
      {message.text}
    </div>
  ))}
</div>
    </div>

    
  )
}

export default ChatWindow
