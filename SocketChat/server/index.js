const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development purposes
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Listen for chat message events
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});