import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Message = {
  id: number;
  email: string;
  text: string;
  avatar?: string;
  isUser?: boolean;
};

const mockMessages: Message[] = [
  {
    id: 1,
    email: 'Aman@demo.com',
    text: 'Hi!',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 2,
    email: 'shambhavi@demo.com',
    text: 'Hey, how are you?',
    avatar: 'https://i.pravatar.cc/150?img=27',
    isUser: true,
  },
  {
    id: 3,
    email: 'harshit@demo.com',
    text: "I'm good, wbu?",
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 4,
    email: 'shambhavi@demo.com',
    text: 'Me too!',
    avatar: 'https://i.pravatar.cc/150?img=27',
    isUser: true,
  },
];

// Typing indicator component
const TypingIndicator: React.FC<{ isUser?: boolean; avatar?: string; email: string }> = ({ 
  isUser, 
  avatar, 
  email 
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      {avatar && (
        <Image
          src={avatar}
          width={200}
          height={200}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className="max-w-[75%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-primary">
            {email}
          </span>
        </div>

        <div className="rounded-2xl px-4 py-2 text-sm bg-muted text-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground mt-1">
          Just now
        </div>
      </div>
    </div>
  );
};


const ChatDemo: React.FC = () => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [typingInfo, setTypingInfo] = useState<{ isTyping: boolean; messageIndex: number }>({ 
    isTyping: false, 
    messageIndex: 0 
  });
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (!animationCompleted && visibleMessages.length === 0) {
      const initialDelay = setTimeout(() => {
        if (mockMessages.length > 0) {
          setVisibleMessages([mockMessages[0]]);
          setTypingInfo({ isTyping: true, messageIndex: 1 });
        }
      }, 1000);
      
      return () => clearTimeout(initialDelay);
    }
  }, [animationCompleted, visibleMessages.length]);

  useEffect(() => {
    if (typingInfo.isTyping && typingInfo.messageIndex < mockMessages.length) {
      const typingTimer = setTimeout(() => {
        setTypingInfo({ isTyping: false, messageIndex: typingInfo.messageIndex });
        setVisibleMessages(prev => [...prev, mockMessages[typingInfo.messageIndex]]);
        
        const nextTypingTimer = setTimeout(() => {
          if (typingInfo.messageIndex + 1 < mockMessages.length) {
            setTypingInfo({ 
              isTyping: true, 
              messageIndex: typingInfo.messageIndex + 1 
            });
          } else {
            setAnimationCompleted(true);
          }
        }, 1000);
        
        return () => clearTimeout(nextTypingTimer);
      }, 2000);
      
      return () => clearTimeout(typingTimer);
    }
  }, [typingInfo, visibleMessages]);

  // Get current date-time for messages
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl border border-transparent shadow-xl">
  <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden bg-[#181818]">
    <div className="bg-white/20 backdrop-blur-xl p-6">
      <div className="flex items-center space-x-4">
        <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
        <h3 className="text-white text-2xl font-bold">Chat Room</h3>
      </div>
    </div>

    <div className="p-6 space-y-4" style={{ minHeight: '300px' }}>
      {visibleMessages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start gap-4",
            message.isUser ? "flex-row-reverse" : ""
          )}
        >
          {message.avatar && (
            <Image
              src={message.avatar}
              width={200}
              height={200}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          )}
          <div className="max-w-[75%]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-white opacity-75">
                {message.email}
              </span>
            </div>

            <div className=" font-bold rounded-xl px-5 py-3 text-lg bg-white/20 backdrop-blur-sm text-white shadow-lg">
              {message.text}
            </div>

            <div className="text-[10px] text-white font-bold opacity-60 mt-2">
              {getCurrentTime()}
            </div>
          </div>
        </div>
      ))}

      {typingInfo.isTyping && typingInfo.messageIndex < mockMessages.length && (
        <TypingIndicator 
          isUser={mockMessages[typingInfo.messageIndex].isUser}
          avatar={mockMessages[typingInfo.messageIndex].avatar}
          email={mockMessages[typingInfo.messageIndex].email}
        />
      )}
    </div>
  </div>
</div>

  );
};

export default ChatDemo;