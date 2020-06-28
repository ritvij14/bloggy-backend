const express = require("express");
const config = require("./config.json");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MONGO_URI = config.MONGO_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//const passport = require("passport");

//app.use(passport.initialize());
//require("./middleware/passport")(passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is up and running.");
})

//using dependencies
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//for no endpoint specified
app.get("/", (req, res) => res.status(200).json({
    message: "Welcome to bloggy"
}));
app.get('/favicon.ico', (req, res) => res.status(204));

//Routes for incoming requests
app.use("/users", require("./routes/userRouter"));
app.use("/posts", require("./routes/postRouter"));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});