var https = require('https')
var querystring = require('querystring')
var concat = require('concat-stream')
var isArray = require('is-array')

var BASE_URL = 'https://gender-api.com/get?'

module.exports = function (name, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  var multipleNames = false
  if (isArray(name)) {
    multipleNames = true
    name = name.join(';')
  }

  var query = querystring.stringify({ name: name })
  https.get(BASE_URL + query, function (res) {
    if (res.statusCode !== 200) return cb(new Error('API call failed'))

    res.pipe(concat(function (body) {
      try {
        var response = JSON.parse(body)

        if (multipleNames === true) {
          var parsedResult = {}
          response.result.map(function (result) {
            parsedResult[result.name] = result.gender
          })

          return cb(null, parsedResult, response)
        }

        cb(null, response.gender, response)
      } catch (e) {
        return cb(new Error('API returned invalid data'))
      }
    }))
  })
}
