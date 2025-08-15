// src/ChatBot.js
import React, { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    const botReply = {
      from: 'bot',
      text: "I'm a friendly doggo bot 🐾! For real answers, you’ll be connected soon to our AI vet assistant.",
    };
    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <h3>🐶 Ask our PawBot</h3>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask about your dog’s health..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
