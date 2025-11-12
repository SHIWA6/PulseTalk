"use client";

import { getSocket } from "@/app/lib/socket.config";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ChatMessage } from "@/types/chat";
import type { Socket } from "socket.io-client";

export function useChat(groupId: string) {
  const { data: session } = useSession();
  const socket = useRef<Socket | null>(null);
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);
  const [roomTitle, setRoomTitle] = useState("Loading...");

  // ✅ Create and manage socket connection lifecycle
  useEffect(() => {
    const s = getSocket();
    socket.current = s;

    s.auth = { room: groupId };
    s.connect();

    s.on("connect", () => {
      console.log("🟢 Connected to socket for room:", groupId);
      setIsConnected(true);
    });

    s.on("disconnect", () => {
      console.log("🔴 Disconnected from socket");
      setIsConnected(false);
    });

    s.on("room_info", (data: { name: string }) => {
      console.log("📦 Received room_info:", data);
      setRoomTitle(data.name);
    });

    // ✅ Proper cleanup
    return () => {
      s.off("connect");
      s.off("disconnect");
      s.off("room_info");
      s.disconnect();
    };
  }, [groupId]);

  // ✅ Fetch messages using react-query
  const messagesQuery = useQuery({
    queryKey: ["messages", groupId],
    queryFn: async () =>
      new Promise<ChatMessage[]>((resolve) => {
        if (!socket.current) return resolve([]);
        socket.current.emit(
          "fetch_messages",
          { room: groupId },
          (msgs: ChatMessage[]) => resolve(msgs)
        );
      }),
    enabled: isConnected,
  });

  // ✅ Listen for new messages
  useEffect(() => {
    if (!socket.current) return;

    const onNew = (msg: ChatMessage) => {
      queryClient.setQueryData(
        ["messages", groupId],
        (old?: ChatMessage[]) => [...(old ?? []), msg]
      );
    };

    socket.current.on("new_message", onNew);
    return () => {
      socket.current?.off("new_message", onNew);
    };
  }, [groupId, queryClient]);

  // ✅ Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!session?.user || !text.trim() || !socket.current) return;
      socket.current.emit("send_message", {
        sender: session.user.id,
        message: text,
        room: groupId,
        user: {
          email: session.user.email,
          avatar: session.user.avatar,
        },
      });
    },
    onError: () => toast.error("Failed to send message"),
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    isConnected,
    roomTitle,
    sendMessage: (text: string) => sendMessageMutation.mutate(text),
  };
}