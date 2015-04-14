# gender-api-client

Get the gender for any given name. This is a client for the [gender-api.com API](https://gender-api.com).

## Usage

Really simple:

```javascript
var gender = require('gender-api-client')

gender('Max', function(err, gender) {
  if (err) return console.err(error)

  console.log('The gender is: ' + gender) // male
})
```

### Querying an email address

Instead of a name you can also provide an email address and gender-api.com will try to read any
names from it.

```javascript
var gender = require('gender-api-client')

gender('max.gfeller@gmail.com', function(err, gender) {
  if (err) return console.err(error)

  console.log('The gender is: ' + gender) // male
})
```

### A list of names

It is also possible to provide an array of names instead of only one. You will then get an object
with all the names as keys and the genders as value back.

```javascript
var gender = require('gender-api-client')

gender(['Max', 'Lisa'], function(err, genders) {
  if (err) return console.err(error)

  console.log('The gender of Lisa is: ' + genders['lisa'])
})
```

### Additional options

There are a few additional options that you can provide:
- `key`: An API key
- `ip`: This is to determine from where a user is
- `country`: Names can have different genders in different countries
- `language`: Names can have different genders in different languages

Example:

```javascript
var gender = require('gender-api-client')

gender('Andrea', { country: 'Germany' }, function(err, gender) {
  if (err) return console.err(error)

  console.log('The gender is: ' + gender) // Andrea is female in Germany...
})

gender('Andrea', { country: 'Italy' }, function(err, gender) {
  if (err) return console.err(error)

  console.log('The gender is: ' + gender) // ...but male in Italy
})

```

## API Limitiations

Without using a key you can run 50 requests a day. By registering to their service (for free) you
can use 1000 requests a month.

If you need to do more you can buy additional requests.

## Running the tests

`npm test`

(Keep in mind that this does actual requests to the API, especially if you are not registered)
