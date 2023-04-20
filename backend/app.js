const express = require('express');
const cors = require("cors");

const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send("Hello, what are you looking for");
})

const encrypt = require('./routes/encrypt');
app.use("/encrypt", encrypt);

const decrypt = require('./routes/decrypt');
app.use("/decrypt", decrypt);

//! Error handler
const err = require('./error/api-error-handler');
app.use(err);

// Socket Chat

io.on('connection', (socket) => {
    console.log(socket.id);

    // Joining a room, sending broadcast to other users
    socket.on('join-room', (data) => {
        socket.join(data.chatId);
        socket.to(data.chatId).emit('joined-room', data);
        socket.to(data.chatId).emit('room-count', io.sockets.adapter.rooms.get(data.chatId).size);
    })

    //Room communication
    socket.on("msg", (data) => {
        socket.to(data.chatId).emit('receive-msg', data);
    })
})


const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log("Listening on Port ",port);
})