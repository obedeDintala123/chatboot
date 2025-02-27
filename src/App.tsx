import { useState } from "react";
import Chat from "./components/Chat";
import Splash from "./components/Splash";

const App = () => {
  const [splash, setSplash] = useState(true);

  const handleClick = () => {
    setSplash(false);
  }

  const closeClick = () => {
    setSplash(true);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {splash ? (<Splash handleClick={handleClick}></Splash>) : <Chat closeClick={closeClick}></Chat>}
    </div>
  )
}

export default App;