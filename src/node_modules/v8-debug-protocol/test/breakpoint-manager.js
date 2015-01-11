var BreakPointManager = require('../lib/breakpoint-manager')
var BreakPoint = require('../lib/breakpoint')
var sinon = require('sinon')
var q = require('q')
var client = require('./client-stub')

describe('Break Point', function() {

  var breakpointManager;

  beforeEach(function() {
    breakpointManager = new BreakPointManager(client)
  })

  describe('when try to list break points', function() {

    beforeEach(function() {
      client.makeFakeRequest()
    })

    it('should try to consume remote debugger of all the break points', function() {
      breakpointManager.list()

      client.request.called.should.be.true;
      client.shouldRequestedWithCommand('listbreakpoints')
    })

    it('should send a standard list breakpoint request', function() {
      breakpointManager.list()
      client.shouldRequestedWithData({})
    })
  })

  describe('when there\'s no any breakpoints', function() {
    beforeEach(function() {
      client.respondWith({
        breakOnExceptions         : false,
        breakOnUncaughtExceptions : false
      })
    })

    it('should takes back a empty array', function() {
      return breakpointManager
              .list()
              .then(function(bkps) {
                bkps.should.be.an.Array
                    .and.lengthOf(0)
              })

    })
  })

  describe('when break point fetched from server', function() {
    beforeEach(function() {
      client.respondWith({
        breakpoints: [{
        }],
        breakOnExceptions         : false,
        breakOnUncaughtExceptions : false
      })
    })

    it('should get one of there\'s only one result from server', function() {
      return breakpointManager.list()
                .then(function(bkps) {
                  bkps.should.be.an.Array
                      .and.lengthOf(1)
                })
    })

  })

  describe('when multiple breakpoints fetched from server', function() {
    beforeEach(function() {
      client.respondWith({
        breakpoints: [{ type: 'scriptId' }, {}],
        breakOnExceptions         : false,
        breakOnUncaughtExceptions : false
      })
    })

    it('should get mutiple breakpoints', function() {
      return breakpointManager
                .list()
                .then(function(bkps) {
                  bkps.should.be.an.Array
                      .and.lengthOf(2)
                })
    })
  })

  describe('when try to clear all the breakpoints', function() {
    beforeEach(function() {
      client.respondWith({
        breakpoints: [{}, {}],
        breakOnExceptions         : false,
        breakOnUncaughtExceptions : false
      })
    })

    afterEach(function() {
      breakpointManager.list.restore()
    })

    it('should able to call the clear for all the breakpoints', function() {
      var deferred = q.defer()
      var breakpointMock = new BreakPoint({})
      sinon.stub(breakpointMock, 'clear')
      sinon.stub(breakpointManager, 'list').returns(deferred.promise)

      deferred.promise.then = function(fn) {
        fn && fn([breakpointMock])
      }

      breakpointManager.clearAll()
      deferred.promise.then()

      breakpointMock.clear.called.should.be.true
    })
  })

  describe('when try to create a new breakpoint', function() {
    beforeEach(function() {
      client.respondWith({
        type: 'script',
        breakpoint: 10
      })
    })

    it('should be able to send the setbreakpoint request', function() {
      breakpointManager
        .createBreakpoint('name.js', 1, 'a == 1');

      client.shouldRequestedWithCommand('setbreakpoint')
    })

    it('should be able to send a filename breakpoint', function() {
      breakpointManager
        .createBreakpoint('name.js', 1, 'a == 1');

      client.shouldRequestedWithData({
        type: 'scriptId',
        target: 'name.js',
        line: 1,
        column: 0,
        enabled: true,
        condition: 'a == 1',
        ignoreCount: 0
      })
    })

    it('should be able to generate a standard breakpoint', function() {
      var readStub = sinon.stub(breakpointManager.scriptManager, 'readScript').returns(q({
        name: 'name.js'
      }))

      return breakpointManager
        .createBreakpoint('name.js', 1, 'a == 1')
        .then(function(breakpoint) {
          breakpoint.script.name.should.equal('name.js')
          breakpoint.line.should.equal(1)
          breakpoint.condition.should.equal('a == 1')
          breakpoint.enabled.should.equal(true)
          breakpoint.number.should.equal(10)
        })
    })


  })

  describe('when client comes back a break event', function() {
    it('should also emit a break event but with a standard breakpoint', function() {
      var cb = sinon.stub()
      breakpointManager.on('break', cb)
      client.emit('break', {})
      cb.called.should.be.true
    })
  })

})
