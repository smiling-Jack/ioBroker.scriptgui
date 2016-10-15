
var Protocol = require('../lib/protocol')
  , sinon = require('sinon')

describe('protocol', function() {

  var proto

  beforeEach(function() {
    proto = new Protocol()
  })

  describe('#serilize', function() {
    it('should serilize the dummy object to a standard protocol request string', function() {
      var obj = {};

      proto.serilize(obj).should.equal(
        'Content-Length: ' +
        Buffer.byteLength('{}', 'utf8') +
        '\r\n\r\n' +
        '{}')

    })

    it('should serilize the simple proto object', function() {
      var obj = { seq: 1 }
      proto.serilize(obj).should.equal(
        'Content-Length: ' +
        Buffer.byteLength('{"seq":1}', 'utf8') +
        '\r\n\r\n' +
        '{"seq":1}'
      )
    })

  })

  describe('#version', function() {
    it('should generate a version request', function() {
      var seq = 1
        , obj = {
            "type"      : "request",
            "command"   : "version"
          }

      proto.version(seq).should.equal(
        'Content-Length: ' +
        Buffer.byteLength('{"seq":1,"type":"request","command":"version"}', 'utf8') +
        '\r\n\r\n' +
        '{"seq":1,"type":"request","command":"version"}'
      )
    })

    it('should generate a version request', function() {
      var seq = 2
        , obj = {
            "type"      : "request",
            "command"   : "version"
          }

      proto.version(seq).should.equal(
        'Content-Length: ' +
        Buffer.byteLength('{"seq":2,"type":"request","command":"version"}', 'utf8') +
        '\r\n\r\n' +
        '{"seq":2,"type":"request","command":"version"}'
      )
    })
  })


  describe('#continue', function() {
    var serilizeMock;

    beforeEach(function() {
      serilizeMock = sinon.stub(proto, 'serilize')
    })

    afterEach(function() {
      serilizeMock.restore()
    })

    it('should generate the continue request protocol', function() {
      proto.continue(1);
      serilizeMock.calledWith({
        seq: 1,
        type: 'request',
        command: 'continue'
      }).should.be.true
    })

    it('should generate the continue request protocol using different seq num', function() {
      proto.continue(2);
      serilizeMock.calledWith({
        seq: 2,
        type: 'request',
        command: 'continue'
      }).should.be.true
    })

    it('should generate the continue in request', function() {
      proto.continue(2, 'in');
      serilizeMock.calledWith({
        seq: 2,
        type: 'request',
        command: 'continue',
        arguments: {
          stepaction: 'in'
        }
      }).should.be.true
    })

    it('should generate the continue in request with step', function() {
      proto.continue(2, 'in', 3);
      serilizeMock.calledWith({
        seq: 2,
        type: 'request',
        command: 'continue',
        arguments: {
          stepaction: 'in',
          stepcount: 3
        }
      }).should.be.true
    })

    it('should generate only continue request with step', function() {
      proto.continue(2, null, 3);
      serilizeMock.calledWith({
        seq: 2,
        type: 'request',
        command: 'continue',
        arguments: {
          stepcount: 3
        }
      }).should.be.true
    })
  })




})
