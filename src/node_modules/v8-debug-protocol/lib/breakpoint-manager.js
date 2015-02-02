var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    BreakPoint = require('./breakpoint'),
    ScriptManager = require('./script-manager'),
    Script = require('./script'),
    q = require('q'),
    proto

inherits(BreakPointManager, EventEmitter)
function BreakPointManager(client) {
  var self = this

  EventEmitter.call(this)
  this.client = client
  this.scriptManager = new ScriptManager(this.client)
  this.client.on('break', function(brk) {
    self.emit('break', new BreakPoint({
      script: new Script(brk.script),
      line: brk.sourceLine
    }))
  })
}

proto = BreakPointManager.prototype

/**
 * list all breakpoints
 */
proto.list = function() {
  var self = this,
      deferred = q.defer(),
      promise

  this.client.request('listbreakpoints', {}, deferred.makeNodeResolver())

  promise = deferred.promise.then(onData)

  function onData(resp) {
    var body = resp.body

    if (!body.breakpoints) {
      return []
    }

    var breakpoints = body.breakpoints.map(function(breakpoint) {
      var data = {}

      data.script = new Script(breakpoint.type === 'scriptId' ? {
        id: breakpoint.script_id
      } : {
        name: breakpoint.script_name
      })

      data.number = breakpoint.number
      data.line = breakpoint.line
      data.ignoreCount = breakpoint.ignoreCount
      data.hitCount = breakpoint.hit_count
      data.enabled = breakpoint.active


      return new BreakPoint(data, self.client)
    })
    return breakpoints
  }

  return promise
}

proto.clearAll = function() {
  return this.list()
            .then(function(breakpoints) {
              return q.all(
                breakpoints.map(function(breakpoint) {
                  return breakpoint.clear()
                })
              )
            })
}

proto.createBreakpoint = function(scriptId, breakLine, condition) {
  var deferred = q.defer(),
      self = this,
      breakpoint = null,
      script = null,
      primise

  this.client.request('setbreakpoint', {
    type: 'scriptId',
    target: scriptId,
    line: breakLine,
    column: 0,
    enabled: true,
    condition: condition,
    ignoreCount: 0
  }, deferred.makeNodeResolver())

  function createBreakPoint(brk, script) {
    brk = brk.body

    return new BreakPoint({
      script: script,
      line: breakLine,
      condition: condition,
      number: brk.breakpoint,
      enabled: true
    }, self.client)
  }

  promise = q.spread([
    deferred.promise,
    this.scriptManager.readScript(scriptId)
  ], createBreakPoint)

  return promise;
}


module.exports = BreakPointManager
