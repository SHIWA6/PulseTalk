import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
      {
        withCredentials: true,
        autoConnect: false, // manually connect inside useChat
        transports: ["websocket"], // ensures fast connection, no polling
      }
    );
  }

  return socket;
};
