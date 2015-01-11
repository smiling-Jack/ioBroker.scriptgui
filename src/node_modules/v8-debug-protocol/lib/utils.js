var _ = require('lodash')


function camel(key) {
  return key.replace(/[-_](\w)/g, function(match) {
    return match[1].toUpperCase()
  })
}

function isEnumerable(val) {
  return val && (_.isArray(val) || _.isObject(val));
}

function keySwitcher(obj, switcherFn) {
  return _.transform(obj, function(result, val, key) {
    val = isEnumerable(val) ? keySwitcher(val, switcherFn) : val
    result[switcherFn(String(key))] = val
  })
}

exports.camelize = function(obj) {
  return keySwitcher(obj, camel)
}

function lodash(key) {
  return key.replace(/[A-Z]/g, function(match) {
    return '-' + match.toLowerCase()
  })
}

exports.lodashlize = function(obj) {
  return keySwitcher(obj, lodash)
}
