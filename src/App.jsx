import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Pricing from './Pricing'
import Chat from './Chat'

function Home({ toggleTheme, theme }) {
  const [demoInput, setDemoInput] = useState('')
  const navigate = useNavigate()

  const handleDemoSend = () => {
    if (demoInput.trim()) {
      navigate('/chat', { state: { initialMessage: demoInput } })
    } else {
      navigate('/chat')
    }
  }

  return (
    <div className="hero-container">
      <nav className="nav">
        <div className="logo">BotFlow</div>
        <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
          <Link to="/pricing" style={{color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none'}}>Pricing</Link>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </nav>

      <main className="hero-content">
        <div className="hero-text">
          <h1>Automate Your Growth with <span style={{color: 'var(--accent)'}}>Next-Gen AI</span></h1>
          <p>
            Engage visitors, capture leads, and provide 24/7 support with our intelligent chatbot solution. Built for creators and modern enterprises.
          </p>
          <div className="cta-group">
            <button className="btn-primary" onClick={() => navigate('/chat')}>Get Started Free</button>
            <button className="btn-secondary" onClick={() => navigate('/pricing')}>View Pricing</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="chat-demo">
            <div className="chat-header">
              <div className="status-dot"></div>
              <span>BotFlow Support</span>
            </div>
            <div className="chat-messages">
              <div className="msg bot">
                Hi there! 👋 How can I help you grow your business today?
              </div>
              <div className="msg user">
                I'd like to automate my customer support.
              </div>
              <div className="msg bot">
                Perfect! Our AI can handle up to 80% of routine queries instantly. Would you like a tour?
              </div>
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDemoSend()}
              />
              <button 
                onClick={handleDemoSend}
                style={{color: 'var(--accent)', fontWeight: 'bold', background: 'transparent'}}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function PricingPage({ toggleTheme, theme }) {
  const navigate = useNavigate()
  return (
    <div className="hero-container">
      <nav className="nav">
        <Link to="/" className="logo" style={{textDecoration: 'none'}}>BotFlow</Link>
        <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </nav>
      <Pricing />
      <div style={{textAlign: 'center', paddingBottom: '4rem'}}>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  )
}

function ChatWrapper({ toggleTheme, theme }) {
  const navigate = useNavigate()
  const location = useLocation()
  const initialMessage = location.state?.initialMessage || ''
  
  return <Chat backToHero={() => navigate('/')} initialMessage={initialMessage} />
}

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} theme={theme} />} />
        <Route path="/pricing" element={<PricingPage toggleTheme={toggleTheme} theme={theme} />} />
        <Route path="/chat" element={<ChatWrapper toggleTheme={toggleTheme} theme={theme} />} />
      </Routes>
    </Router>
  )
}

export default App
