# gender-api-client

This is a client for the [gender-api.com API](https://gender-api.com).

## Usage

Really simple:

```javascript
var gender = require('gender-api-client')

gender('Max', function(err, gender) {
  if (err) return console.err(error)

  console.log('The gender is: ' + gender)
})
```

## Running the tests

`npm test`
