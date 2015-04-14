var https = require('https')
var querystring = require('querystring')
var concat = require('concat-stream')
var isArray = require('is-array')
var isEmail = require('is-email')

var BASE_URL = 'https://gender-api.com/get?'
var availableOpts = ['country', 'ip', 'language', 'key']

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
  var queryObject = {}
  isEmail(name) ? queryObject.email = name : queryObject.name = name

  Object.keys(opts).map(function (opt) {
    if (availableOpts.indexOf(opt) === -1) return

    queryObject[opt] = opts[opt]
  })

  https.get(BASE_URL + querystring.stringify(queryObject), function (res) {
    if (res.statusCode !== 200) return cb(new Error('API call failed'))

    res.pipe(concat(function (body) {
      try {
        var response = JSON.parse(body)

        if (response.errno) return cb(new Error(response.errmsg))

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
