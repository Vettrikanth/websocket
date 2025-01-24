
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let userCount = 0; // Counter for users

io.on('connection', (socket) => {
    userCount++; // Increment user count
    const username = `User${userCount}`; // Assign a unique username
    console.log(`${username} connected`);

    // Listen for messages from this user
    socket.on('message', (message) => {
        console.log(`${username} said: ${message}`);
        io.emit('message', `${username} said: ${message}`); // Broadcast the message
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`${username} disconnected`);
    });
});


http.listen(8080, () => console.log('listening on http://localhost:8080') );