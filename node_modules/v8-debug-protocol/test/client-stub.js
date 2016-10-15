var Client = require('../lib/client')
  , sinon = require('sinon')
  , should = require('should')
  , client = {}

client.__proto__ = Client.prototype

sinon.stub(client, 'request')

function stubMaker(context, fn) {
  try {
    fn.bind(context)()
  }
  catch(e) {
    client.request.restore()
    fn.bind(context)()
  }
}

client.makeFakeRequest = function() {
  stubMaker(client, function() {
    sinon.stub(client, 'request')
  })
}

client.respondWith = function(something) {
  stubMaker(client, function() {
    sinon.stub(client, 'request').callsArgWith(2, null, {
      type: 'response',
      body: something
    })
  })
}

client.respondWithCollection = function(collection) {
  stubMaker(client, function() {
    var requestStub = sinon.stub(client, 'request')
    collection.forEach(function(item, index) {
      requestStub.onCall(index).callsArgWith(2, null, {
        type: 'response',
        body: item
      })
    })
  })
}

client.respondWithError = function(someErr) {
  stubMaker(client, function() {
    sinon.stub(client, 'request').callsArgWith(2, someErr, null)
  })
}

client.shouldRequestedWithCommand = function(command) {
  client.request.args[0][0].should.eql(command)
  client.request.restore()
}

client.shouldRequestedWithData = function(data) {
  client.request.args[0][1].should.eql(data)
  client.request.restore()
}

module.exports = client
