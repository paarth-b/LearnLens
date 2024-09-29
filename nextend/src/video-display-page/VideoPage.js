'use client'; // Ensure this component is rendered on the client side

import React, { useState, useEffect } from 'react';
import { useFile } from '../app/FileContext';
import ReactPlayer from 'react-player';
import './VideoPage.css'; // Import the CSS file

export default function VideoPage() {
  const { file } = useFile(); // Optional usage of file context

  // Store messages in state (could also move to Redux or context if needed later)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Function to simulate sending message to AI model (you'll replace this with your model's API)
  const sendToModel = async (userMessage) => {
    // Simulate AI response with a delay (this should be your API call to your AI model)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI Response to "${userMessage}"`);
      }, 1000); // Simulate 1s delay for AI response
    });
  };

  // Handle sending message when user submits
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return; // Prevent empty messages

    const userMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue(''); // Clear the input after sending

    // Send user message to AI model and get the response
    const aiResponseText = await sendToModel(userMessage.text);

    const aiMessage = { id: messages.length + 2, text: aiResponseText, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  return (
    <div className="container">
      {/* Video Player Section */}
      <div className="video-player">
        <ReactPlayer controls url="https://www.youtube.com/watch?v=_0MXhG1shEc" />
      </div>

      {/* Chatbox Section */}
      <div className="chat-box">
        <div className="chat-header">Chatbot</div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Allow sending by pressing "Enter"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
