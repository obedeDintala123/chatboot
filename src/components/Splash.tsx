import { useState, useEffect } from 'react';
import chatbot from '../assets/img/floating-robot_78370-3669.webp';
interface splashProps {
    handleClick: () => void;
}
const Splash = ({handleClick}: splashProps) => {
    const [message, setMessage] = useState<string>('Chatbot');

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('Clique para iniciar a conversa!');
        }, 1900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <img src={chatbot} alt="" width={100} className='animate-bounce cursor-pointer' onClick={handleClick}/>
            <span className='text-[#00a6ff] w-64 text-center'>{message}</span>
        </div>
    )
} 

export default Splash;