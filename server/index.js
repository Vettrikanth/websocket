
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let userCount = 0; // Count for users

io.on('connection', (socket) => {
    userCount++; 
    const username = `User${userCount}`;
    console.log(`${username} connected`);

    socket.on('message', (message) => {
        console.log(`${username} said: ${message}`);
        io.emit('message', `${username} said: ${message}`); 
    });

    socket.on('disconnect', () => {
        console.log(`${username} disconnected`);
    });
});


http.listen(8080, () => console.log('listening on http://localhost:8080') );