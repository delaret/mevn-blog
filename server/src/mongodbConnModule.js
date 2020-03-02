const mongoose = require('mongoose')

//соединение с базой
module.exports.connect = function() {
    mongoose.connect('mongodb://localhost:27017/posts');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function(callback) {
        console.log('Connection Succeeded');
    });
    return db;
}