const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, what are you looking for");
})

const encrypt = require('./routes/encrypt');
app.use("/encrypt", encrypt);


//! Error handler
const err = require('./error/api-error-handler');
app.use(err);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Listening on Port ",port);
})