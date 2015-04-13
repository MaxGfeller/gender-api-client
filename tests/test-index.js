var test = require('tape')
var gender = require('../')

test('Basic functionality', function (t) {
  gender('max', function (err, gender, details) {
    t.notOk(err, 'no error')
    t.equal(gender, 'male', 'Max\' gender is male')
    t.end()
  })
})

test('Invalid name', function (t) {
  gender('blobber', function (err, gender, details) {
    t.notOk(err, 'no error')
    t.equal(gender, 'unknown', 'blobber is undefined')
    t.end()
  })
})
