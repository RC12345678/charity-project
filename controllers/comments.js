//comments.js
const express = require('express');
const app = express()
const Comment = require('../models/comment');

function comments(app) {
app.post('/charities/comments', (req, res) => {
    console.log(req.body);
  Comment.create(req.body).then(comment => {
    res.redirect(`/charities/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  });
});
}

module.exports = comments
