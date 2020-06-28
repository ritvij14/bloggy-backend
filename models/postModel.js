const mongoose = require("mongoose");
const schema = mongoose.Schema;

const post = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
};

const postSchema = new schema(post);
module.exports = mongoose.model("Post", postSchema);