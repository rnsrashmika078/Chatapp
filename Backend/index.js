import express from 'express';  // Use import for express
import { Server } from 'socket.io';  // Use import for socket.io
import http from 'http';  // Use import for http module
import cors from 'cors';  // Import CORS module to handle CORS

const app = express();

// Enable CORS for the React client URL
app.use(cors({
  origin: 'https://chatapp-client-gamma.vercel.app',  // Replace with your React client URL
  methods: ['GET', 'POST'],
}));

// Create an HTTP server and integrate it with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://chatapp-client-gamma.vercel.app',  // Same client URL here
    methods: ['GET', 'POST'],
  }
});

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

// Start the server on port 5000
server.listen(5000, () => {
    console.log("Server started on port 5000");
});
