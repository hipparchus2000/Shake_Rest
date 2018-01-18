
process.env.DB_URL = 'mongodb://localhost/test';
process.env.token = 'testApiToken';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../../server');
var Part = require("../../api/part/partModel");

var should = chai.should();
chai.use(chaiHttp);


describe('Parts', function() {

  Part.collection.drop();

  beforeEach(function(done){
    var newPart = new Part({
      storyName: 'testStoryName',
      storyText: 'testStoryText',
			date: 'testDate',
			order: 'testOrder'
    });
    newPart.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Part.collection.drop();
    done();
  });


	it('should add a SINGLE part on /parts POST', function(done) {
  chai.request(server)
    .post('/parts/')
		.set('token', 'testApiToken')
    .send({'storyName': 'testStoryName', 'storyText': 'testStoryText', 'date':'testDate', 'order':'testOrder' })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
	});
	
  it('should list a SINGLE part on /part/<id> GET', function(done) {
    var newpart = new Part({
		order:'testOrder',
		date:'testDate',
      storyName: 'testStoryName',
      storyText: 'testStoryText'
    });
    newpart.save(function(err, data) {
      chai.request(server)
        .get('/parts/'+data.id)
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
 	
  it('should list ALL parts on /parts GET', function(done) {
  chai.request(server)
    .get('/parts/')
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
  
	it('should update a SINGLE part on /part/<id> PUT', function(done) {
		chai.request(server)
			.get('/parts/')
			.end(function(err, res){
				chai.request(server)
					.put('/parts/'+res.body[0]._id)
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

	it('should delete a SINGLE part on /part/<id> DELETE', function(done) {
		chai.request(server)
			.get('/parts/')
			.end(function(err, res){
				chai.request(server)
					.delete('/parts/'+res.body[0]._id)
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

