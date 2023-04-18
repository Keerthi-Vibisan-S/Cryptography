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
        origin: "http://192.168.168.220:3000",
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
})


const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log("Listening on Port ",port);
})