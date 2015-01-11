var Script = require('./script'),
    q = require('q'),
    proto,
    NORMAL_SCRIPTS = 4

function ScriptManager(client) {
  this._client = client
}

proto = ScriptManager.prototype

proto.fetch = function(options) {
  var deferred = q.defer(),
      promise

  this._client.request('scripts', options, deferred.makeNodeResolver())

  promise = deferred.promise.then(function (data) {
    if (data.body && data.body.length > 1) {
      return data.body.map(function(item) {
        return new Script(item)
      })
    }
    return new Script(data.body[0])
  })

  return promise;
}

proto.readScript = function(id, opts) {
  opts = opts || {}

  return this.fetch({
    type: opts.type || NORMAL_SCRIPTS,
    ids: [id],
    includeSource: true
  })
}

proto.listAll = function() {
  return this.fetch({
    type: NORMAL_SCRIPTS,
    includeSource: false
  })
}


module.exports = ScriptManager
