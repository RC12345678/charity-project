var exphbs = require('express-handlebars');

const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true});

const bodyParser = require('body-parser');
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
});
const methodOverride = require('method-override')

//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// let reviews = [
//     { title: "Great Review"},
//     { title: "Next Review"},
//     { title: "The Little Mermaid"}
// ]

//INDEX

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

//SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(req.params.id);
        console.log(err.message);
    })
});

//EDIT

app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


//CREATE
app.post('/reviews/new', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`); // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  })
})

//UPDATE

app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review=> {
            res.redirect(`/reviews/${review.id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})
