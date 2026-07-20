Your task is to write a test for the following function:
```
countries-and-timezones.getAllCountries()
```

This function is defined as follows:
```
function getAllCountries() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.keys(data.countries).reduce(function (prev, id) {
      return Object.assign(prev, _defineProperty({}, id, getCountry(id, options)));
    }, {});
  }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');
describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getAllCountries', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.