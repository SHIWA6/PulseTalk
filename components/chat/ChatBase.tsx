"use client"

import { useState } from "react"
import { useChat } from "@/hooks/useChat"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInputArea } from "./ChatInputArea"

export default function ChatBase({ groupId }: { groupId: string }) {
  const {
    messages,
    isConnected,
    roomTitle,
    sendMessage,
  
  } = useChat(groupId)
  
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (!messageText.trim() || messageText.length > 5000) return
    
    sendMessage(messageText)
    
    setMessageText("")
  }

  return (
    <div className="flex flex-col h-full overflow-x-hidden overflow-y-hidden">
      <ChatHeader roomTitle={roomTitle} isConnected={isConnected} />
      <MessageList messages={messages} />
      <ChatInputArea
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
        maxMessageLength={5000}
      />
    </div>
  )
}