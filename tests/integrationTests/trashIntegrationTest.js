
process.env.DB_URL = 'mongodb://localhost/test';
process.env.token = 'testApiToken';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../../server');
var Trash = require("../../api/trash/trashModel");

var should = chai.should();
chai.use(chaiHttp);


describe('Trashs', function() {

  Trash.collection.drop();

  beforeEach(function(done){
    var newTrash = new Trash({
      storyName: 'testStoryName',
      storyText: 'testStoryText',
			date: 'testDate',
			order: 'testOrder'
    });
    newTrash.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Trash.collection.drop();
    done();
  });


	it('should add a SINGLE trash on /trashs POST', function(done) {
  chai.request(server)
    .post('/trashs/')
		.set('token', 'testApiToken')
    .send({'storyName': 'testStoryName', 'storyText': 'testStoryText', 'date':'testDate', 'order':'testOrder' })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
	});
	
  it('should list a SINGLE trash on /trash/<id> GET', function(done) {
    var newtrash = new Trash({
		order:'testOrder',
		date:'testDate',
      storyName: 'testStoryName',
      storyText: 'testStoryText'
    });
    newtrash.save(function(err, data) {
      chai.request(server)
        .get('/trashs/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('date');
					res.body.should.have.property('order');
					res.body.should.have.property('storyName');
					res.body.should.have.property('storyText');
					res.body._id.should.equal(data.id);
					res.body.order.should.equal('testOrder');
					res.body.date.should.equal('testDate');
					res.body.storyName.should.equal('testStoryName');
					res.body.storyText.should.equal('testStoryText');
          done();
        });
    });
  });
 	
  it('should list ALL trashs on /trashs GET', function(done) {
  chai.request(server)
    .get('/trashs/')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('date');
      res.body[0].should.have.property('order');
      res.body[0].should.have.property('storyName');
			res.body[0].should.have.property('storyText');
      res.body[0].order.should.equal('testOrder');
      res.body[0].date.should.equal('testDate');
      res.body[0].storyName.should.equal('testStoryName');
      res.body[0].storyText.should.equal('testStoryText');
      done();
    });
	});
  
	it('should update a SINGLE trash on /trash/<id> PUT', function(done) {
		chai.request(server)
			.get('/trashs/')
			.end(function(err, res){
				chai.request(server)
					.put('/trashs/'+res.body[0]._id)
					.set('token', 'testApiToken')
					.send({'storyName': 'Spider'})
					.end(function(error, response){
						response.should.have.status(200);
						response.should.be.json;
						response.body.should.be.a('object');
						done();
				});
			});
	});

	it('should delete a SINGLE trash on /trash/<id> DELETE', function(done) {
		chai.request(server)
			.get('/trashs/')
			.end(function(err, res){
				chai.request(server)
					.delete('/trashs/'+res.body[0]._id)
					.set('token', 'testApiToken')
					.end(function(error, response){
						response.should.have.status(200);
						response.should.be.json;
						response.body.should.be.a('object');
						done();
				});
			});
	});

});

