const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
};

const userSchema = new schema(user);
module.exports = mongoose.model("users", userSchema);