var utils = require('../lib/utils')

describe('Camelize', function() {

  it('should camelize the object key', function() {
    var obj = {
      'var-key': 123
    }

    utils.camelize(obj).varKey.should.equal(123)
  })

  it('should camelize multipal key', function() {
    var obj = {
      'var-keya': 123,
      'var-keyb': 234
    }

    utils.camelize(obj).varKeya.should.equal(123)
    utils.camelize(obj).varKeyb.should.equal(234)
  })

  it('should returns the empty object when pass into a empty one', function() {
    var obj = {}
    utils.camelize(obj).should.eql({})
  })

  it('should transform the object recrusively', function() {
    var obj = {
      'var-key-a': {
        'var-key-b': {
          'var-key-c': 1
        }
      }
    }

    utils.camelize(obj).should.eql({
      varKeyA: {
        varKeyB: {
          varKeyC: 1
        }
      }
    })
    
  })
})

describe('Lodashlize', function() {
  it('should lodash the object key', function() {
    var obj = {
      'varKey': 123
    }

    utils.lodashlize(obj)['var-key'].should.equal(123)
  })
})
