import React from 'react';
import ChatBot from './ChatBot';

const ChatBotWrapper = ({ children }) => {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
};

export default ChatBotWrapper; 