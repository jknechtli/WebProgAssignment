// const expect = require('expect');
const app = require('../server.js');

const chai = require('chai');
// const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



describe('Server test', function () {
  // The function passed to before() is called before running the test cases.
  before(function () {
    console.log("before test");
  });

  // The function passed to after() is called after running the test cases.
  after(function () {
    console.log("after test");
  });

  describe('/api/user/:id', () => {
    it('it should get users', () => {
      return sleep(10)
        .then(() => {
          chai.request('http://localhost:3001')
            .get('/api/user/john')
            .end((err, res) => {
              res.should.have.status(200);
              res.body[0].should.have.property('username');
              res.body[0].should.have.property('role');
            })
        })
    });
  });

  describe('/api/users', () => {
    it('it should GET all the users', () => {
      return sleep(10)
        .then(() => {
          chai.request('http://localhost:3001')
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
            })
        })
    });
  });
});