var FrameManager = require('../lib/frame-manager')
var client = require('./client-stub')
var Writable = require('stream').Writable

describe('Frame Manager', function() {

  var frameManager
  var writable
  var frames

  beforeEach(function() {
    frames = [
      {
        number: 2,
        receiver: 1
      },
      {
        number: 1,
        receiver: null
      }
    ];
    frameManager = new FrameManager(client)
    writable = new Writable({
      objectMode: true
    })
    writable.frames = []

    client.respondWithCollection(frames)
  })

  it('should be able to fetch all the frames in the frame queue', function(done) {
    frameManager.on('data', function(frame) {
      writable.frames.push(frame)
    })

    frameManager.on('end', function() {
      writable.frames.should.have.lengthOf(2)
      done()
    })

    frameManager.pipe(writable)

  })
})
