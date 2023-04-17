const express = require('express');
const decryptShell = require('../functions/decryptShell');
const ApiError = require('../error/ApiError');

const route = express.Router();

route.get("/", (req, res) => {
    res.send("Decrypt Route").end();
})

route.post("/data", async (req, res, next) => {
    // console.log(req.body);
    const text = req.body.text;
    const isKey = req.body.isKey;
    const key = req.body.key;

    const response = {};
    try {
        response.decrypted = await decryptShell(text, isKey, key);
        // console.log(response);
    }
    catch(err){
        // console.log("I caught the error, ",err);
        next(ApiError.badDecrypt("Encrypted text is Invalid"));
        return;
    }
    res.json(response).status(200).end();
})

module.exports = route;