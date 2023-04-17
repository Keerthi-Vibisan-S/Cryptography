const express = require("express");
const encryptShell = require("../functions/encryptShell");
const ApiError = require("../error/ApiError");
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Encryption Route");
});

route.post("/data", async (req, res, next) => {
    console.log(req.body);
    const text = req.body.text;
    const isKey = req.body.isKey;
    const key = req.body.key;

    const response = {};
    try {
        response.encrypted = await encryptShell(text, isKey, key);
        // console.log(response);
    }
    catch(err){
        // console.log("I caught the error, ",err);
        next(ApiError.internal("Server side error"));
        return;
    }
    res.json(response).status(200).end();
});

module.exports = route;

