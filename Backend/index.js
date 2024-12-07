import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // or specify allowed origins
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);  // Broadcast message to all clients
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
