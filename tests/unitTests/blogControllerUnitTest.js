

process.env.token = 'testApiToken';
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();

describe('Blogs', function() {


  beforeEach(function(done){
		
		clock = sinon.useFakeTimers();
		eventEmitterStub = sinon.stub(calculator, 'emit');
		callbackSpy = sinon.spy();
		
    var newBlog = new Blog({
      storyName: 'testStoryName',
      storyText: 'testStoryText',
			date: 'testDate',
			order: 'testOrder'
    });
    newBlog.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Blog.collection.drop();
		clock.restore();
    done();
  });

	it('should add a SINGLE blog on /blogs POST', function(done) {
  chai.request(server, callbackSpy)
    .post('/blogs/')
		.set('token', 'testApiToken')
    .send({'storyName': 'testStoryName', 'storyText': 'testStoryText', 'date':'testDate', 'order':'testOrder' })
    .end(function(err, res){
			clock.tick(1000);
			assert.equal(callbackSpy.called, true);
			assert.equal(eventEmitterStub.calledWithExactly('result', 27), true);
			assert.equal(eventEmitterStub.calledBefore(callbackSpy), true);

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
	});
	
  it('should list a SINGLE blog on /blog/<id> GET', function(done) {
    var newblog = new Blog({
		order:'testOrder',
		date:'testDate',
      storyName: 'testStoryName',
      storyText: 'testStoryText'
    });
    newblog.save(function(err, data) {
      chai.request(server)
        .get('/blogs/'+data.id)
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
 	
  it('should list ALL blogs on /blogs GET', function(done) {
  chai.request(server)
    .get('/blogs/')
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
  
	it('should update a SINGLE blog on /blog/<id> PUT', function(done) {
		chai.request(server)
			.get('/blogs/')
			.end(function(err, res){
				chai.request(server)
					.put('/blogs/'+res.body[0]._id)
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

	it('should delete a SINGLE blog on /blog/<id> DELETE', function(done) {
		chai.request(server)
			.get('/blogs/')
			.end(function(err, res){
				chai.request(server)
					.delete('/blogs/'+res.body[0]._id)
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


//sinon bit

describe('incrementStoredData', function() {
  it('should increment stored value by one', function() {
    var storeMock = sinon.mock(store);
    storeMock.expects('get').withArgs('data').returns(0);
    storeMock.expects('set').once().withArgs('data', 1);

    incrementStoredData();

    storeMock.restore();
    storeMock.verify();
  });
});