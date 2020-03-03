const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongodb_conn_module = require('./mongodbConnModule')
const Post = require('../models/post')

//запуск сервера
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//коннект к базе
const db = mongodb_conn_module.connect();

//новый пост//new post
app.post('/add_post', (req, res) => {
    let db = req.db;
    let title = req.body.title;
    let description = req.body.description;
    let new_post = new Post ({
        title: title,
        description: description
    })
    new_post.save(function(error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})

//все сообщения//all posts
app.get('/posts', (req, res) => {
    Post.find({}, 'title description', function (error, posts){
        if (error) { console.error(error); }
        res.send({
            posts: posts
        })
    }).sort({_id: -1})
})

//редактирование поста//update a post
app.put('/posts/:id', (req, res) => {
    let db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post){
        if (error) { console.error(error); }
        post.title = req.body.title
        post.description = req.body.description
        post.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

//получить один пост//fetch single post
app.get('/post/:id', (req, res) => {
    let db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post){
        if (error) { console.error(error); }
        res.send(post)
    })
})

//удалить пост//delete post
app.delete('/posts/:id', (req, res) => {
    let db = req.db;
    Post.remove({_id: req.params.id}, function(err, post){
        if(err)
        res.send(err)
        res.send({
            success: true
        })
    })
})

app.listen(process.env.PORT || 8081)