const express = require("express");
const encryptShell = require("../functions/encryptShell");
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Encryption Route");
});

route.post("/data", async (req, res) => {
    console.log(req.body);
    const text = req.body.text;
    const response = {};

    if(req.body.isKey == true) {
        console.log("Own Key");
        // response.encrypted = await encryptShell("dd");
    }
    else {
        // response.encrypted = await encryptShell("dd");
        console.log("Server Key");
    }
    
    res.json(response).status(200);
});

module.exports = route;

