var rewire = require('rewire'),
    sinon = require('sinon'),
    ScriptManager = rewire('../lib/script-manager'),
    Script = require('../lib/script')



describe('ScriptManager', function() {

  var manager,
      client

  beforeEach(function() {
    client = {}
    client.request = sinon.stub()
    manager = new ScriptManager(client)
  })

  describe('when try to get the script of a file', function() {
    it('should try to get the script file of the file name', function() {
      manager.readScript(123)
      client.request.called.should.be.true
    })

    it('should try to get the script file with script command', function() {
      manager.readScript(123)
      client.request.args[0][0].should.equal('scripts')
    })

    it('should try to get the script file with script options ', function() {
      manager.readScript(123)
      client.request.args[0][1].should.eql({
        type: 4,
        includeSource: true,
        ids: [123]
      })
    })

    it('should call the callback when request successful', function() {
      var response = { type: 'scripts', body: [{ source: 'console.log("hello world");\n' }] }
      client.request.callsArgWith(2, null, response)
      return manager
                .readScript(123)
                .then(function(script) {
                  script.should.have.property('source')
                })

    })
  })

  describe('when remote debugger returns the result of response', function() {

    it('should parse it to normal Script Object', function() {
      var response = { type: 'scripts', body: [{ source: 'console.log("hello world");\n' }] }
      client.request.callsArgWith(2, null, response)
      return manager
                .readScript(123)
                .then(function(script) {
                  script.should.be.instanceOf(Script)
                })
    })

  })

  describe('when try to list all the scripts', function() {

    it('should be able to fetch all', function() {
        var response = {
          type: 'scripts',
          body: [
            { source: 'console.log("hello world");\n' },
            { source: 'console.log("hello world");\n' }
          ]
        }
        client.request.callsArgWith(2, null, response)
        return manager
                  .listAll()
                  .then(function(scripts) {
                    scripts.should.have.lengthOf(2)
                  })
    })

  })

})
