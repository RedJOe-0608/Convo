import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
function App() {

  return (
    <div className='flex bg-primary-dark'>
   <Sidebar/>
    <ChatWindow />
    </div>
  )
}

export default App
