// const expect = require('expect');
// const app = require('../server.js');

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
    it('it should get users', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/user/john')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username');
          res.body.should.have.property('role');
          done()
        })
    });
  });

  describe('/api/users', () => {
    it('it should GET all the users', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done()
        })
    });
  });

  describe('/api/groups', () => {
    it('it should GET all the groups', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/groups')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done()
        })
    });
  });

  describe('/api/auth', () => {
    it('it should GET authorized user', (done) => {
      chai.request('http://localhost:3001')
        .post('/api/auth')
        .send({ username: 'test', password: 'test' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username');
          done()
        })
    });
  });

  describe('/api/group', () => {
    it('it should create group', (done) => {
      chai.request('http://localhost:3001')
        .post('/api/group')
        .send({
          name: 'test',
          channels: [
            {
              name: 'cTest',
              users: ['test-username']
            }
          ]
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('num');
          done()
        })
    });
  });

  describe('/api/user', () => {
    it('it should create a user', (done) => {
      chai.request('http://localhost:3001')
        .post('/api/user')
        .send({
          username: 'test-username',
          email: 'test-email',
          role: 'test-role',
          groups: 'test-groups',
          birthday: 'test-birthday',
          password: 'test-password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('num');
          done()
        })
    });
  });

  describe('/api/user/:id', () => {
    it('it should get a user', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/user/test-username')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username');
          done()
        })
    });
  });

  describe('/api/user/:id/groups', () => {
    it('it should get a user', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/user/test-username/groups')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done()
        })
    });
  });

  describe('/api/user/:id/delete', () => {
    it('it should delete a user', (done) => {
      chai.request('http://localhost:3001')
        .delete('/api/user/test-username/delete')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('ok');
          done()
        })
    });
  });

  describe('/api/chat/:group/:channel', () => {
    it('it should GET all the chat logs', (done) => {
      chai.request('http://localhost:3001')
        .get('/api/chat/based/4chan')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done()
        })
    });
  });

});