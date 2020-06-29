const express = require("express");
const router = express.Router();
const ADMIN_USER = require("../config.json").ADMIN_USER || process.env.ADMIN_USER;
const ADMIN_PASSWORD = require("../config.json").ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

router.post("/", async (req, res) => {
    if (req.body.userName === ADMIN_USER && req.body.password === ADMIN_PASSWORD) {
        return res.status(200).json({
            message: "Auth successful!"
        });
    }
    return res.status(401).json({
        message: "Auth failed"
    });
});

module.exports = router;