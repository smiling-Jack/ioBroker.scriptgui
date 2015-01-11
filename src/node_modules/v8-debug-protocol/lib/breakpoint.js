var _ = require('lodash'),
    EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    q = require('q'),
    proto

/**
 *  type: 'script' || 'function'
 *  number: 'breakpoint number'
 *  enabled: 'same as active'
 *  condition: ''
 *  ignoreCount: ignoreCount
 *  line: num
 *  hit_count: num
 *
 */
inherits(BreakPoint, EventEmitter)
function BreakPoint(data, client) {
  EventEmitter.call(this)
  this.client = client

  _.extend(this, data)
}

proto = BreakPoint.prototype

proto.clear = function() {
  var deferred = q.defer()
  var self = this
  this.client.request('clearbreakpoint', {
    breakpoint: this.number
  }, deferred.makeNodeResolver())

  deferred.promise.then(function() {
    self.emit('destroy')
  })

  return deferred.promise
}

proto.active = function() {
  this.enabled = true
  return this.save()
}


proto.save = function() {
  var deferred = q.defer()
  var self = this

  this.client.request('changebreakpoint', {
    breakpoint: this.number,
    enabled: this.enabled,
    condition: this.condition,
    ignoreCount: this.ignoreCount
  }, deferred.makeNodeResolver())

  deferred.promise.then(function() {
    self.emit('change')
  })

  return deferred.promise
}

module.exports = BreakPoint
