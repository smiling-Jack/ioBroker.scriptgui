var sinon = require('sinon'),
    BreakPoint = require('../lib/breakpoint'),
    client = require('./client-stub')

describe('BreakPoint', function() {

  var breakpoint

  beforeEach(function() {
    client.respondWith({
    })

    breakpoint = new BreakPoint({
      type: 'scriptId',
      scriptId: 100,
      number: 10,
      line: 100,
      column: 20,
      groupId: 12,
      hitCount: 0,
      ignoreCount: 1,
      actualLocations: 234
    }, client)
  })

  it('should be able to clear itself', function () {
    breakpoint.clear()
    client.shouldRequestedWithCommand('clearbreakpoint');
  })

  it('should be able to clear itself using breakpoint number', function() {
    breakpoint.clear()
    client.shouldRequestedWithData({
      breakpoint: 10
    });
  })

  it('should be able to active itself', function() {
    breakpoint.active()
    client.shouldRequestedWithCommand('changebreakpoint');
  })

})
