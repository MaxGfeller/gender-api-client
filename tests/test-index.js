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

test('A couple of names', function (t) {
  gender(['Max', 'Jan', 'Susanna', 'Peter'], function (err, genders, details) {
    t.notOk(err, 'no error')
    t.equals(typeof genders, 'object', 'must be an object in this case')
    t.equals(genders['max'], 'male', 'max is male')
    t.equals(genders['susanna'], 'female', 'susanna is female')
    t.ok(details, 'details must be set')
    t.end()
  })
})

test('Look up email address', function (t) {
  gender('max.gfeller@gmail.com', function (err, gender, details) {
    t.notOk(err, 'no error')
    t.equals(gender, 'male', 'gender is male')
    t.ok(details, 'details must be set')
    t.end()
  })
})
