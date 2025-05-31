import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
/**
 * Instead of letting Express handle HTTP requests directly, this wraps the Express app inside an HTTP server using Node.js's http.createServer(app).

This is useful because Socket.io works better when attached to a raw HTTP server rather than relying on Express alone.
 */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}

// to store online users
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("A user is Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //io.emit() send events to all the connected clients

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
