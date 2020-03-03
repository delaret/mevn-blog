const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let PostSchema = new Schema ({
    title: String,
    description: String
});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;