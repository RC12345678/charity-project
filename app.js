var exphbs = require('express-handlebars');

const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true});

const bodyParser = require('body-parser');

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


const reviews = require('./controllers/reviews')(app);

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app; 
