//review.js
const mongoose = require('mongoose');

const Comment = require('./comment.js');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
});

module.exports = Review
