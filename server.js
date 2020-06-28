const express = require("express");
const config = require("./config.json");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MONGO_URI = require("./config.json").MONGO_URI || process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

//app.get('/favicon.ico', (req, res) => res.status(204));

//Routes for incoming requests
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

//for no endpoint specified
app.use("/", (req, res) => res.status(200).json({
    message: "Welcome to bloggy"
}));