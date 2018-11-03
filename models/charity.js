//review.js
const mongoose = require('mongoose');

const Comment = require('./comment.js');

const Charity = mongoose.model('Charity', {
    title: String,
    description: String,
    charityTitle: String,
});

module.exports = Charity
