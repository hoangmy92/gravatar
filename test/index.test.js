var url      = require('url');
var http     = require('http');
var https    = require('https');
var sizeOf   = require('image-size');
var expect   = require('chai').expect;
var Gravatar = require('../index');

describe('Gravatar', function() {
  var gravatar;
  var email1   = 'test1@gmail.com';
  var email2   = 'test2@gmail.com';
  var result   = 'http://www.gravatar.com/avatar/3c4f419e8cd958690d0d14b3b89380d3?s=400&d=identicon';
  var options1 = {
    default     : 'identicon',
    requireType : true,
    size        : 400
  };

  before(function() {
    gravatar = Gravatar(email1, options1);
  });

  describe('Initialization', function() {
    it('should be an instanceof Gravatar', function() {
      expect(gravatar).to.be.an('object');
      expect(gravatar).to.have.property('email');
    });

    it('should able to load default configuration', function() {
      expect(gravatar.options).to.be.an('object');
    });

    it('should able to set default email', function() {
      expect(gravatar.email).to.equal(email1);
    });
  });

  describe('Getter - Setter', function() {
    it('should able to set new email', function() {
      gravatar.setEmail(email2);
      expect(gravatar.email).to.equal(email2);
    });

    it('should able to get email', function() {
      expect(gravatar.getEmail()).to.equal(email2);
    });

    it('should able to get list of options', function() {
      var gOptions = gravatar.getOptions();

      expect(gOptions).to.be.an('object');
      expect(gOptions).to.have.property('requireType');
      expect(gOptions['requireType']).to.equal(false);
    });

    it('should able to set new options as an object', function() {
      gravatar.setOptions(options1);
      expect(gravatar.options).to.deep.equals(options1);
    });

    it('should able to set a couple of config', function() {
      gravatar.setOptions('requireType', false);
      expect(gravatar.options['requireType']).to.be.false;
    });
  });

  describe('Common functions', function() {
    it('should able to get avatar image with default options', function(done) {
      var options = url.parse(gravatar.getAvatar());

      http.get(options, function (response) {
        var chunks = [];
        expect(response.statusCode).to.equal(200);

        response.on('data', function (chunk) {
          chunks.push(chunk);
        }).on('end', function() {
          var buffer = Buffer.concat(chunks);
          var result = sizeOf(buffer);

          expect(result.width).to.equal(options1.size);
          expect(result.height).to.equal(options1.size);
          expect(result.type).to.equal('png');
          done();
        });
      });
    });

    it('should able to get avatar image with new dimensions', function(done) {
      var newSize = 200;
      var options = url.parse(gravatar.getAvatar({ size: newSize }));

      http.get(options, function (response) {
        var chunks = [];
        expect(response.statusCode).to.equal(200);

        response.on('data', function (chunk) {
          chunks.push(chunk);
        }).on('end', function() {
          var buffer = Buffer.concat(chunks);
          var result = sizeOf(buffer);

          expect(result.width).to.equal(newSize);
          expect(result.height).to.equal(newSize);
          expect(result.type).to.equal('png');
          done();
        });
      });
    });

    it('should able to get avatar image with type', function(done) {
      var path = gravatar.getAvatar({ requireType: true });
      expect(/jpg/.test(path)).to.be.true;

      http.get(path, function (response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should able to get avatar in secure link', function(done) {
      var path = gravatar.getAvatar({ secure: true });
      expect(/https/.test(path)).to.be.true;

      https.get(path, function(res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })
  });
});
