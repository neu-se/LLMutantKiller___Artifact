Your task is to write a test for the following function:
```
countries-and-timezones.getTimezone(name)
```

This function is defined as follows:
```
function getTimezone(name) {
    if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
    return timezones[name] ? _objectSpread2({}, timezones[name]) : null;
  }
```

You may use the following examples to guide your implementation:
```
// usage #1
const ct = require('countries-and-timezones');const timezone = ct.getTimezone('America/Los_Angeles');console.log(timezone);/*Prints:{  name: 'America/Los_Angeles',  countries: [ 'US' ],  utcOffset: -480,  utcOffsetStr: '-08:00',  dstOffset: -420,  dstOffsetStr: '-07:00',  aliasOf: null}*/
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');
describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezone', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.