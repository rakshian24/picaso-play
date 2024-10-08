import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import cors from "cors";
dotenv.config({ path: "./.env" });

const app = express();
const { SERVER_PORT } = process.env;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: "/socket.io",
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  socket.on("join_room", (room: string) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on(
    "drawing",
    (data: { room: string; offsetX: number; offsetY: number }) => {
      // Emit the drawing data to all users in the room except the sender
      socket.to(data.room).emit("drawing", data);
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "./build")));

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
