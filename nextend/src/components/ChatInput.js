import React from 'react';
import './chat-input-style.css';
import { ReactComponent as SendIcon } from './send-arrow.svg'; // Assuming you have the arrow SVG icon

const ChatInput = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}  
          placeholder="Enter your video URL here..."
        />
        <button className="send-button" onClick={onSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
