
function Protocol() {

}

Protocol.prototype.serilize = function(obj) {
  var json = JSON.stringify(obj)

  return 'Content-Length: ' + Buffer.byteLength(json, 'utf8') +
         '\r\n\r\n' +
         json
}

Protocol.prototype.version = function(seq) {
  var json = { seq: seq, type: 'request', command: 'version' }
  return this.serilize(json)
}

Protocol.prototype.continue = function(seq, type, step) {
  var request = {
    seq: seq,
    type: 'request',
    command: 'continue'
  }

  if (type) {
    request.arguments = {}
    request.arguments.stepaction = 'in'
  }

  if (step) {
    request.arguments = request.arguments || {}
    request.arguments.stepcount = step
  }

  return this.serilize(request);
}

module.exports = Protocol
