'use client';

import { useState, useEffect } from 'react';

/**
 * AI-powered chat widget with WhatsApp quick-link.
 *
 * Features:
 * - Integrates with external webhook for AI responses
 * - Visibility controlled by scroll position on mobile (hidden in Hero/Contact)
 * - Session-based conversation tracking
 * - WhatsApp fallback button for direct contact
 *
 * @visibility Hidden on mobile when in Hero or Contact sections
 */
export default function ChatWidget() {
    // --- UI State ---
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // --- Chat State ---
    const [messages, setMessages] = useState([
        { text: "Olá! Sou a Sofia, a inteligência artificial da Architecode. Estou aqui para agilizar seu contato. Como posso te ajudar?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // --- Visibility Logic ---
    // Hides widget on mobile when user is viewing Hero or Contact sections
    useEffect(() => {
        const updateVisibility = () => {
            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                const homeSection = document.getElementById('home');
                const contactSection = document.getElementById('contact');
                const windowHeight = window.innerHeight;

                let shouldHide = false;

                if (homeSection) {
                    const rect = homeSection.getBoundingClientRect();
                    if (rect.bottom > 100) shouldHide = true;
                }

                if (contactSection) {
                    const rect = contactSection.getBoundingClientRect();
                    if (rect.top < windowHeight - 80) shouldHide = true;
                }

                setIsVisible(!shouldHide);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', updateVisibility);
        window.addEventListener('resize', updateVisibility);
        updateVisibility();

        return () => {
            window.removeEventListener('scroll', updateVisibility);
            window.removeEventListener('resize', updateVisibility);
        };
    }, []);

    // --- Session Initialization ---
    useEffect(() => {
        setSessionId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    }, []);

    // --- Message Handling ---
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('https://webhook.gamt.click/webhook/architecode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userMessage,
                    sessionId: sessionId
                })
            });

            if (response.ok) {
                const data = await response.json();
                const botReply = data.reply || "Mensagem recebida.";
                setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { text: "Erro ao enviar. Tente novamente.", sender: 'bot' }]);
            }
        } catch (error) {
            console.error('Webhook error:', error);
            setMessages(prev => [...prev, { text: "Erro de conexão.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const visibilityClass = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10 pointer-events-none';

    return (
        <>
            {/* Overlay backdrop */}
            <div
                id="chat-overlay"
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'hidden opacity-0'}`}
                onClick={toggleChat}
            ></div>

            {/* WhatsApp quick-link button */}
            <a
                href="https://api.whatsapp.com/send?phone=5512981996782&text=Ol%C3%A1!%20Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20e%20solu%C3%A7%C3%B5es%20da%20Architecode."
                target="_blank"
                id="whatsapp-icon"
                className={`fixed bottom-24 right-6 z-[100] w-14 h-14 bg-[#e5e4e2] bg-opacity-80 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 animate-pulse-shadow ${isOpen ? 'hidden' : ''} ${visibilityClass}`}
            >
                <i data-feather="smartphone" className="w-7 h-7 text-white"></i>
            </a>

            {/* Chat toggle button */}
            <div
                id="chat-icon"
                className={`fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#e5e4e2] bg-opacity-80 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 animate-pulse-shadow ${isOpen ? 'hidden' : ''} ${visibilityClass}`}
                onClick={toggleChat}
            >
                <i data-feather="message-circle" className="w-8 h-8 text-white"></i>
            </div>

            {/* Chat window */}
            <div
                id="chat-window"
                className={`fixed bottom-[90px] right-[20px] w-[350px] max-w-[90vw] h-[500px] max-h-[70vh] bg-white rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col z-[10000] transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="p-[15px] bg-[#3A5A7A] text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="m-0 text-[1.1em] font-bold">Atendimento Architecode</h3>
                            <p className="text-white/80 text-xs flex items-center mt-0.5">
                                <span className="w-2 h-2 bg-[#00C1D4] rounded-full mr-1.5 shadow-[0_0_5px_#00C1D4]"></span>
                                Online agora
                            </p>
                        </div>
                    </div>
                    <button id="close-btn" className="bg-none border-none text-white cursor-pointer hover:opacity-80 transition-opacity" onClick={toggleChat}>
                        <i data-feather="x" className="w-6 h-6"></i>
                    </button>
                </div>

                {/* Message list */}
                <div id="chat-body" className="flex-grow p-[15px] overflow-y-auto bg-[#f4f4f4] flex flex-col gap-[10px]">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-[10px_15px] rounded-[18px] max-w-[80%] leading-[1.4] text-[0.95rem] shadow-sm ${msg.sender === 'user' ? 'bg-[#3A5A7A] text-white self-end rounded-br-[4px]' : 'bg-[#e9e9eb] text-[#333] self-start rounded-bl-[4px]'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input form */}
                <div className="p-[10px] border-t border-[#ddd] bg-white">
                    <form id="chat-form" className="flex gap-[10px]" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                        <input
                            type="text"
                            id="chat-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Digite sua mensagem..."
                            className="flex-grow border border-[#ccc] rounded-[20px] px-[15px] py-[10px] text-[1em] text-[#333] focus:outline-none focus:border-[#3A5A7A] disabled:opacity-50"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            id="send-btn"
                            className="bg-[#3A5A7A] border-none text-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-[#2c455d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            <i data-feather="send" className="w-5 h-5"></i>
                        </button>
                    </form>
                    <p className="text-center text-[9px] text-slate-400 mt-2 font-medium tracking-wide">
                        Powered by Architecode
                    </p>
                </div>
            </div>
        </>
    );
}
