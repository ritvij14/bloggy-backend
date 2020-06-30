const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const verifier = jwt.verify(token, process.env.JWT_KEY || require("../config.json").JWT_KEY);
        req.user = verifier;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};