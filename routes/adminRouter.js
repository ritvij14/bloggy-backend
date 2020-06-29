const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ADMIN_USER = process.env.ADMIN_USER || require("../config.json").ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || require("../config.json").ADMIN_PASSWORD;

router.post("/", async (req, res) => {
    if (req.body.userName === ADMIN_USER && req.body.password === ADMIN_PASSWORD) {
        const token = jwt.sign({
            admin: req.body.userName
            },
            process.env.JWT_KEY || require("../config.json").JWT_KEY,
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({
            message: "Auth successful!",
            token: token
        });
    }
    return res.status(401).json({
        message: "Auth failed"
    });
});

module.exports = router;