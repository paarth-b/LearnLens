import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
// import ChatInput from './ChatInput';
import FileInput from './FileInput';
import "./open-page-style.css";
// import ReactPlayer from 'react-player';


export default function OpenPage() {
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState(''); 
  const handleSend = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setVideoUrl(message);
      setMessage('');  // Clear input after sending
    }
  };
  
  return (
    <div className="outer-wrapper">
      <div id="typingAnimation">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed once, initially
            'Learn about Trees',
            5000,
            'Learn about Graphs',
            5000,
            'Learn about Queues',
            5000,
          ]}
          speed={35}
          style={{ fontSize: '2em' }}
          repeat={Infinity}
        />
      </div>
      <div id="fileUpload">
        <FileInput />
      </div>
    </div>
  );
}

