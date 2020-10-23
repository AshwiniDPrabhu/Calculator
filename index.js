let express = require('express');
let path = require('path');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', express.static(path.join(__dirname, 'client/build')));

let users = {};
let calculations = [];

io.on('connection', socket =>{
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
        console.log("User connected - " + name);

        calculations.forEach((calc) => {
            socket.emit('calc-message-out', calc);
        })
    });

    socket.on('calc-message', message => {
        console.log(message);
        responseMessage = {time: Date.now(), message: message, name: users[socket.id]};
        io.sockets.emit('calc-message-out', responseMessage);

        calculations.push(responseMessage);
    });
})

http.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});