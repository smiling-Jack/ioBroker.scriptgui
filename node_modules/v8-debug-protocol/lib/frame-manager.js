var Readable = require('stream').Readable
var Q = require('q')
var inherits = require('util').inherits
var Frame = require('./frame')

inherits(FrameManager, Readable)
function FrameManager(client) {
  Readable.call(this, {
    objectMode: true
  })
  this.client = client
  this.lastReciver = null;
}

FrameManager.prototype._read = function() {
  var deferred = Q.defer()
  var self = this
  
  if (self.isEnd) {
    return self.push(null)
  }

  this.client.request('frame', {
    number: this.lastReciver
  }, deferred.makeNodeResolver())

  deferred.promise.then(function(resp) {
    var body = resp.body
    var frame = new Frame(body)

    if (!body.receiver) {
      self.isEnd = true
    }

    self.lastReciver = frame.receiver
    self.push(frame)
  })
}

module.exports = FrameManager;
