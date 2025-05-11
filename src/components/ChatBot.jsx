import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm AIU Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (lowerMessage.includes('admission') || lowerMessage.includes('apply')) {
      return "To apply for admission, please visit our admissions page or contact our admissions office at admissions@aiu.edu.eg";
    } else if (lowerMessage.includes('program') || lowerMessage.includes('course')) {
      return "We offer various programs in different fields. You can find detailed information about our programs on our website.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "You can reach us at info@aiu.edu.eg or call us at +20 123 456 789";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm here to help! Could you please provide more details about your question?";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      
      const botResponse = getBotResponse(inputMessage);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 500);
      
      setInputMessage('');
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AIU Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chatbot-button" onClick={toggleChat}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatBot; 