const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

//запуск сервера
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.get('/posts',(req, res) => {
    res.send(
        [{
            title: "Hello world!",
            description: "Привет! Как дела?"
        }]
    )
})
app.listen(process.env.PORT || 8081)

//соединение с базой
module.exports.connect = function() {
    mongoose.connect('mongodb://localhost:27017/posts')
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.onse('open', function(callback) {
        console.log('Connection Succeeded');
    });
    return db;
}