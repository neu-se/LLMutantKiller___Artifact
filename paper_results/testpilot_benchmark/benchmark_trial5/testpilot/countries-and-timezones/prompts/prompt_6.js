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