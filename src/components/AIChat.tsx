import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Message } from '../types';
import Button from './ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import AIService from '../services/AIService';

interface AIChatProps {
  artist: string;
}

const AIChat: React.FC<AIChatProps> = ({ artist }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = AIService.getInstance();
  
  // On component mount, add a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `Welcome to the ${artist} concert! I'm your AI companion. Ask me anything about ${artist} or the concert!`,
      sender: 'ai',
      timestamp: Date.now()
    };
    
    setMessages([welcomeMessage]);
  }, [artist]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await aiService.sendMessage(input, artist);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="h-full flex flex-col" glassEffect>
      <CardHeader className="border-b border-gray-700 bg-concert-dark bg-opacity-60">
        <div className="flex items-center gap-2">
          <div className="music-visualizer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h2 className="text-lg font-bold">{artist} Concert Companion</h2>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'ai' && (
              <div className="rounded-full bg-concert-highlight p-2 text-white">
                <Bot size={16} />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-concert-highlight text-white'
                  : 'bg-concert-light text-white'
              }`}
            >
              {message.content}
            </div>
            
            {message.sender === 'user' && (
              <div className="rounded-full bg-primary-600 p-2 text-white">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-concert-highlight p-2 text-white">
              <Bot size={16} />
            </div>
            <div className="bg-concert-light text-white max-w-[80%] rounded-lg p-3">
              <div className="flex gap-1">
                <span className="animate-pulse">•</span>
                <span className="animate-pulse delay-100">•</span>
                <span className="animate-pulse delay-200">•</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 bg-concert-dark bg-opacity-60">
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the artist or concert..."
            className="flex-1 bg-concert-light border border-gray-700 rounded-md p-2 text-white"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            icon={<Send size={16} />}
            variant="primary"
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChat;