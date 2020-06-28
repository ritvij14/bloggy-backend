const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const validateLoginInput = require("../validation/login");
const user = require("../models/userModel");

router.post("/login", (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {email, password} = req.body;
    user.findOne({email}).then(user => {
        if (!user) {
            return res.status(400).json({email: "Email not found."});
        }
        bcrypt.compare (password, user.password).then(isMatch => {

            if (isMatch) {
                const payload = {
                    email: user.email,
                    password: user.password
                };
                jwt.sign (payload, SECRET, {expiresIn: 3600}, (err, token) => {
                    if (err) {
                        console.log(err);
                    }

                    return res.json({
                        success: true,
                        token: "Bearer: " + token
                    });
                });
            } else {
                return res.status(400).json({password: "Password is incorrect"});
            }
        });
    });
});

module.exports = router;