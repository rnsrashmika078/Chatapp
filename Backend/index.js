import express from 'express';  // Use import for express
import { Server } from 'socket.io';  // Use import for socket.io
import http from 'http';  // Use import for http module

const app = express();

// Create an HTTP server and integrate it with socket.io
const server = http.createServer(app);
const io = new Server(server);

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for messages from the client
    socket.on('message', (msg) => {
        io.emit('message', msg);  // Broadcast the message to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Define a route for the app
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Start the server on port from the environment or default to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
