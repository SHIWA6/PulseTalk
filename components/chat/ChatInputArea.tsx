"use client"

import { useState } from "react"
import { ChatInput } from "@/components/ui/chat-input"
import { Button } from "@/components/ui/button"
import { Send, Smile, Image as ImageIcon } from "lucide-react"
import EmojiPicker, { Theme } from 'emoji-picker-react'
import GifPicker from 'gif-picker-react'

interface ChatInputAreaProps {
  messageText: string
  setMessageText: React.Dispatch<React.SetStateAction<string>>
  handleSendMessage: () => void
  maxMessageLength: number
}

export function ChatInputArea({ 
  messageText, 
  setMessageText, 
  handleSendMessage, 
  maxMessageLength 
}: ChatInputAreaProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showGifPicker, setShowGifPicker] = useState(false)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxMessageLength) {
      setMessageText(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setMessageText((prevText: string) => prevText + emojiObject.emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="sticky bottom-0 z-10 border-t border-zinc-800/40 bg-gradient-to-tr from-slate-900 via-zinc-900 to-zinc-800/95 supports-[backdrop-filter]:bg-white/5 supports-[backdrop-filter]:backdrop-blur-sm p-4 shadow-[0_-10px_40px_rgba(2,6,23,0.55)]">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div className="flex-1 pl-20 relative">
            <textarea
              value={messageText}
               onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className=" sm:w-full mt-0.5 min-h-12 h-12 px-4 pl-12 py-2 text-sm rounded-xl resize-none
                         bg-white/85 dark:bg-zinc-900/60 text-stone-100/90 dark:text-stone-100
                         placeholder:text-zinc-500 border border-zinc-800/40 shadow-inner
                         ring-1 ring-transparent focus:ring-4 focus:ring-emerald-600/20 focus:border-emerald-600
                         transition-all duration-200"
              maxLength={maxMessageLength}
            />

            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full ring-1 ring-transparent hover:ring-emerald-600/30
                           hover:bg-zinc-800/40 text-stone-100 hover:scale-105 active:scale-100 transition-all"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker)
                  setShowGifPicker(false)
                }}
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full ring-1 ring-transparent hover:ring-emerald-600/30
                           hover:bg-zinc-800/40 text-stone-100 hover:scale-105 active:scale-100 transition-all"
                onClick={() => {
                  setShowGifPicker(!showGifPicker)
                  setShowEmojiPicker(false)
                }}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>

            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 rounded-xl border border-zinc-800/40 bg-white/95 dark:bg-zinc-900/85 shadow-2xl p-2">
                <EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.DARK}/>
              </div>
            )}

            {showGifPicker && (
              <div className="absolute bottom-full left-0 mb-2 bg-white/95 dark:bg-zinc-900/85 border border-zinc-800/40 rounded-xl p-0 w-[280px] h-[380px] overflow-hidden shadow-2xl z-50 ring-1 ring-zinc-900/20">
                <div className="text-sm h-full">
                  <GifPicker 
                    tenorApiKey={process.env.NEXT_PUBLIC_TENOR_API_KEY || ''} 
                    onGifClick={(gif) => {
                      setMessageText(gif.url)
                      setShowGifPicker(false)
                    }}
                    width={280}
                    height={380}
                    theme={Theme.DARK}
                  />
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={!messageText.trim() || messageText.length > maxMessageLength}
            className="h-10 w-10 rounded-xl shadow-lg ring-1 ring-zinc-900/30
                       bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-stone-100
                       hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0
                       disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-zinc-400 text-right mt-1">
          {messageText.length}/{maxMessageLength}
        </div>
      </div>
    </div>
  )
}
