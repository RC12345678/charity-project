//comments.js
const express = require('express');
const app = express()
const Comment = require('../models/comment');

function comments(app) {
app.post('/charities/:charityId/comments', (req, res) => {
    console.log(req.body);
  Comment.create(req.body).then(comment => {
    res.redirect(`/charities/${comment.charityId}`);
  }).catch((err) => {
    console.log(err.message);
  });
});

app.delete('/charities/comments/:id', (req, res) => {
    console.log('hello????');
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then(comment => {
    res.redirect(`/charities/${comment.charityId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})
}

module.exports = comments
