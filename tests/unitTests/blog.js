var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();


describe('Blogs', function() {
  it('should list ALL blobs on /blogs GET', function(done) {
	  chai.request(server)
		.get('/blogs')
		.end(function(err, res){
		  res.should.have.status(200);
		  done();
		});
	});  
  it('should list a SINGLE blog on /blog/<id> GET');
  it('should add a SINGLE blog on /blogs POST');
  it('should update a SINGLE blog on /blog/<id> PUT');
  it('should delete a SINGLE blog on /blog/<id> DELETE');
});

