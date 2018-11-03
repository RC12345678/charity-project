// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Review = require('../models/charity');

chai.use(chaiHttp);

describe('Charities', ()  => {

  // TEST INDEX
  it('should index ALL charities on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /charities/new GET', (done) => {
  chai.request(server)
    .get(`/charities/new`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
});
  // TEST CREATE
  // TEST SHOW
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE
});
