var https = require('https')
var querystring = require('querystring')
var concat = require('concat-stream')

const BASE_URL = 'https://gender-api.com/get?'

module.exports = function (name, cb) {
  var query = querystring.stringify({ name: name })
  https.get(BASE_URL + query, function (res) {
    if (res.statusCode !== 200) return cb(new Error('API call failed'))

    res.pipe(concat(function (body) {
      try {
        var response = JSON.parse(body)

        cb(null, response.gender, response)
      } catch (e) {
        return cb(new Error('API returned invalid data'))
      }
    }))
  })
}
