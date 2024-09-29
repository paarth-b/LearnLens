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

  // Quiz state to store questions and answers
  const [quiz, setQuiz] = useState({
    question: "Loading question...",
    options: [],
  });


  // Function to simulate AI response with a delay
const sendToModel = async (userMessage) => {
  // Define an array of possible responses
  const aiResponses = [
    `AI: Here's some insight on "${userMessage}".`,
    `AI: That's an interesting question about "${userMessage}". Let me help.`,
    `AI: I have a few thoughts on "${userMessage}". Let's dive in.`,
  ];

  // Simulate AI response with a delay (this should be your API call to your AI model)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select one of the responses
      const randomIndex = Math.floor(Math.random() * aiResponses.length);
      resolve(aiResponses[randomIndex]);
    }, 1000); // Simulate 1s delay for AI response
  });
};

  // const sendToModel = async (userMessage) => {
  //   // Simulate AI response with a delay (this should be your API call to your AI model)
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(`AI Response to "${userMessage}"`);
  //     }, 1000); // Simulate 1s delay for AI response
  //   });
  // };

  // Function to simulate getting a quiz from the AI
  const getQuizFromAI = async () => {
    // Simulate a quiz response with 5 options (replace with real AI logic)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          question: "What Data Structure is used for Least Recently Used cache?",
          options: ["Hashmap", "LinkedList", "Hashset", "Insertion Sort", "Python"],
        });
      }, 1000);
    });
  };

  // Fetch a quiz question when the page loads
  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await getQuizFromAI();
      setQuiz(quizData);
    };
    fetchQuiz();
  }, []);

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
        <ReactPlayer width="90%" height="50%"  controls url="https://www.youtube.com/watch?v=HqPJF2L5h9U" />
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

      {/* Quiz Section */}
      <div className="quiz-box">
        <div className="quiz-header">Quiz Time!</div>
        <div className="quiz-question">{quiz.question}</div>
        <div className="quiz-options">
          {quiz.options.map((option, index) => (
            <button key={index} className="quiz-option">{option}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
