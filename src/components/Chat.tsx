import { useState, useRef, useEffect } from 'react';
import chatboot from '../assets/img/floating-robot_78370-3669.webp';
import sendIcon from '../assets/img/aviao-de-papel.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatProps {
    closeClick: () => void;
}
const Chat = ({ closeClick }: ChatProps) => {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const chatRef = useRef<HTMLDivElement>(null);

    const apiKey = import.meta.env.VITE_GEMINI_API;

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!inputValue.trim()) return;
    
        // Adiciona a mensagem do usuário à lista
        const newMessages = [...messages, { text: inputValue, isUser: true }];
        setMessages(newMessages);
        setInputValue("");

        try {
            const ai = new GoogleGenerativeAI(apiKey);
            const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
            // Gera a resposta
            const result = await model.generateContent(inputValue);
            const response = await result.response;
            const text = response.text(); // Obtém a resposta do modelo
    
            // Adiciona a resposta do modelo ao estado
            setMessages([...newMessages, { text, isUser: false }]);
        } catch (error) {
            console.error("Erro ao gerar resposta:", error);
        }
    };
    


    return (
        <div className='flex flex-col rounded-xl border border-[#d9d9d9] w-80 shadow'>
            <header className='flex items-center justify-between'>
                <div className='flex gap-2 p-2 bg-white rounded-t-xl'>
                    <img src={chatboot} alt="chatboot" width={45} height={45} className='rounded-4xl' />
                    <div>
                        <span className='font-medium text-[#00a6ff]'>Chatboot</span>
                        <p className='text-xs'>Online</p>
                    </div>
                </div>

                <button title='close' className='p-2 cursor-pointer' onClick={closeClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </header>
            <main className="h-72 bg-[#EAEEF3] px-2 flex flex-col overflow-y-auto" ref={chatRef}>
                {messages.map((msg, index) => (
                    <div key={index}  className={`max-w-[90%] p-2 rounded-lg mt-2 ${msg.isUser ? "self-end bg-[#00A6FF] text-white" : "self-start bg-gray-300 text-black"}`}>
                        {msg.text}
                    </div>
                ))}
            </main>
            <form className='flex justify-between items-center p-4 bg-white rounded-b-xl' onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder='Enter your message' className='flex justify-between outline-0 text-sm w-2/3' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                <button title='send' className='cursor-pointer border-[#d9d9d9] text-sm' onClick={sendMessage}>
                    <img src={sendIcon} alt="" width={18} height={18} />
                </button>
            </form>
        </div>
    )
}

export default Chat;