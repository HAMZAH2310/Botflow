import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, ArrowLeft } from 'lucide-react'
import { sendMessageToN8n } from './services/chatService'

export default function Chat({ backToHero, initialMessage = '' }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Explore the power of AI! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage)
    }
  }, [initialMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text) => {
    const msg = text || input
    if (!msg.trim()) return

    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setInput('')
    setIsTyping(true)

    try {
      const response = await sendMessageToN8n(msg)
      // Expecting response in format { output: "..." } or similar
      const botReply = response.output || response.message || JSON.stringify(response)
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: botReply 
      }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Sorry, I'm having trouble connecting to the brain. Please check the connection." 
      }])
      console.log(import.meta.env.VITE_N8N_WEBHOOK_URL);
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <button className="back-btn" onClick={backToHero}>
          <ArrowLeft size={20} /> Back to Home
        </button>
        <div className="history">
          <h3>Recent Chats</h3>
          <div className="history-item active">General Inquiry</div>
          <div className="history-item">Support Ticket #102</div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-content">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>
              <div className="avatar">
                {m.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="text">{m.content}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble bot">
              <div className="avatar"><Bot size={20} /></div>
              <div className="text typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="chat-controls">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          <button 
            className="send-btn" 
            onClick={() => handleSend()}
            disabled={isTyping}
            style={{ opacity: isTyping ? 0.5 : 1 }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
