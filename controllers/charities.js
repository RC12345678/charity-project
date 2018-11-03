//charity.js
const express = require('express');
const Comment = require('../models/comment');
const app = express()
const Charity = require('../models/charity')


module.exports = function(app) {

  //INDEX
  app.get('/', (req, res) => {
      Charity.find()
          .then(charities => {
              console.log(charities)
              res.render('charities-index', { charities: charities });
          })
          .catch(err => {
              console.log(err);
          })
  })

  //NEW
  app.get('/charities/new', (req, res) => {
      res.render('charities-new', {});
  })

  //CREATE
  app.post('/charities', (req, res) => {
    Charity.create(req.body).then((charity) => {
      // console.log(req.body);
      console.log(charity);
      res.redirect(`/charities/${charity._id}`); // Redirect to charities/:id
    }).catch((err) => {
      console.log(err.message);
    })
  })

  //SHOW
  app.get('/charities/:id', (req, res) => {
      //find charity
      Charity.findById(req.params.id).then((charity) => {
          Comment.find({charityId: req.params.id}).then(comments => {
              res.render('charities-show', {charity: charity, comments: comments })
          })
      }).catch((err) => {
          console.log(err.message);
      });
  });

  //EDIT
  app.get('/charities/:id/edit', function (req, res) {
      Charity.findById(req.params.id, function(err, charity) {
          res.render('charities-edit', {charity: charity } );
      }).catch ( (error) => {
          console.log(error.message)
      })

  })

  //DELETE
  app.delete('/charities/:id', function (req, res) {
      console.log("DELETE charity")
      Charity.findByIdAndRemove(req.params.id).then((charity) => {
          res.redirect('/');
      }).catch((err) => {
          console.log(err.message);
      })
  })

  //UPDATE
  app.put('/charities/:id', (req, res) => {
      Charity.findByIdAndUpdate(req.params.id, req.body)
          .then(charity=> {
              res.redirect(`/charities/${charities.id}`)
          })
          .catch(err => {
              console.log(err.message)
          })
  })

}
