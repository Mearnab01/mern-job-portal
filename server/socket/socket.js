import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});
io.on("connection", (socket) => {
  //console.log("user connected", socket.id);
  socket.on("join_room", (userId) => {
    socket.join(userId); // create/join a room named after user ID
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  socket.on("new_job_notification", (notification) => {
    //console.log("Sending notification:", notification);
    socket.emit("new_job_notification", notification);
  });
  socket.on("new_user_registered", (notification) => {
    console.log("Sending notification:", notification);
    socket.emit("new_user_registered", notification);
  });
  socket.on("proposal_related", (notification) => {
    console.log("Sending notification:", notification);
    socket.emit("proposal_related", notification);
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected:");
  });
});

export { io, server, app };
