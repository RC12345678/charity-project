//comments.js
const express = require('express');
const app = express()
const Comment = require('../models/comment');

module.exports = (app) => {
    app.post('/charities/:charityId/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.redirect(`/charities/${comment.charityId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

    app.get('/charities/comments/:id/edit', function (req, res) {
        Comment.findById(req.params.id, function(err, comment) {
            res.render('partials/comment-edit', {comment: comment} );
        }).catch ( (error) => {
            console.log(error.message)
        })

    })
    // update comment
    app.put('/charities/comments/:id', (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body)
            .then(comment=> {
                res.redirect(`/charities/${comment.charityId}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/charities/comments/:id', (req, res) => {
        console.log(`delete comment id ${req.params.id}`)
      Comment.findByIdAndRemove(req.params.id).then(comment => {
        console.log(comment)
        res.redirect(`/charities/${comment.charityId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}
