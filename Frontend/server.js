import { Server } from 'socket.io'; 
const io = new Server(3000); 
io.on('connection', (socket) => { 
console.log('A user connected'); 
socket.on('message', (msg) => { 
io.emit('message', msg); 
}); 
socket.on('disconnect', () => { 
console.log('A user disconnected'); 
}); 
}); 