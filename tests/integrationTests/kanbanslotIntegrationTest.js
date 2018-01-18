
process.env.DB_URL = 'mongodb://localhost/test';
process.env.token = 'testApiToken';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../../server');
var Kanbanslot = require("../../api/kanban/kanbanslotsModel");

var should = chai.should();
chai.use(chaiHttp);


describe('Kanbanslots', function() {

  Kanbanslot.collection.drop();

  beforeEach(function(done){
    var newKanbanslot = new Kanbanslot({
      storyName: 'testStoryName',
      storyText: 'testStoryText',
			date: 'testDate',
			order: 'testOrder'
    });
    newKanbanslot.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Kanbanslot.collection.drop();
    done();
  });


	it('should add a SINGLE kanbanslot on /kanbanslots POST', function(done) {
  chai.request(server)
    .post('/kanbanslots/')
		.set('token', 'testApiToken')
    .send({'storyName': 'testStoryName', 'storyText': 'testStoryText', 'date':'testDate', 'order':'testOrder' })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
	});
	
  it('should list a SINGLE kanbanslot on /kanbanslot/<id> GET', function(done) {
    var newkanbanslot = new Kanbanslot({
		order:'testOrder',
		date:'testDate',
      storyName: 'testStoryName',
      storyText: 'testStoryText'
    });
    newkanbanslot.save(function(err, data) {
      chai.request(server)
        .get('/kanbanslots/'+data.id)
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
 	
  it('should list ALL kanbanslots on /kanbanslots GET', function(done) {
  chai.request(server)
    .get('/kanbanslots/')
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
  
	it('should update a SINGLE kanbanslot on /kanbanslot/<id> PUT', function(done) {
		chai.request(server)
			.get('/kanbanslots/')
			.end(function(err, res){
				chai.request(server)
					.put('/kanbanslots/'+res.body[0]._id)
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

	it('should delete a SINGLE kanbanslot on /kanbanslot/<id> DELETE', function(done) {
		chai.request(server)
			.get('/kanbanslots/')
			.end(function(err, res){
				chai.request(server)
					.delete('/kanbanslots/'+res.body[0]._id)
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

