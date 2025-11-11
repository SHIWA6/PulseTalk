"use client"

import { getSocket } from "@/app/lib/socket.config"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ChatMessage } from "@/types/chat"

export function useChat(groupId: string) {
  const { data: session } = useSession()
  const socket = useRef(getSocket())
  const queryClient = useQueryClient()
  const [isConnected, setIsConnected] = useState(false)
  const [roomTitle, setRoomTitle] = useState("Loading...")

  useEffect(() => {
    socket.current.auth = { room: groupId }
    socket.current.connect()

    socket.current.on("connect", () => {
      console.log("🟢 Connected to socket for room:", groupId)
      setIsConnected(true)
    })

    socket.current.on("disconnect", () => {
      console.log("🔴 Disconnected from socket")
      setIsConnected(false)
    })

    // ✅ Listen for room info from backend
    socket.current.on("room_info", (data: { name: string }) => {
      console.log("📦 Received room_info:", data)
      setRoomTitle(data.name)
    })

    return () => {
      socket.current.off("connect")
      socket.current.off("disconnect")
      socket.current.off("room_info") // cleanup listener
      socket.current.disconnect()
    }
  }, [groupId])

  const messagesQuery = useQuery({
    queryKey: ["messages", groupId],
    queryFn: async () =>
      new Promise<ChatMessage[]>((resolve) => {
        socket.current.emit("fetch_messages", { room: groupId }, (msgs: ChatMessage[]) => {
          resolve(msgs)
        })
      }),
    enabled: isConnected,
  })

  useEffect(() => {
    const onNew = (msg: ChatMessage) => {
      queryClient.setQueryData(["messages", groupId], (old?: ChatMessage[]) => [...(old ?? []), msg])
    }
    socket.current.on("new_message", onNew)
    return () => socket.current.off("new_message", onNew)
  }, [groupId, queryClient])

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!session?.user || !text.trim()) return
      socket.current.emit("send_message", {
        sender: session.user.id,
        message: text,
        room: groupId,
        user: {
          email: session.user.email,
          avatar: session.user.avatar,
        },
      })
    },
    onError: () => toast.error("Failed to send message"),
  })

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    isConnected,
    roomTitle,
    sendMessage: (text: string) => sendMessageMutation.mutate(text),
  }
}
