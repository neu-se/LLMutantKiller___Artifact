Your task is to write a test for the following function:
```
countries-and-timezones.getTimezonesForCountry(countryId)
```

You may use the following examples to guide your implementation:
```
// usage #1
const ct = require('countries-and-timezones');const timezones = ct.getTimezonesForCountry('MX');console.log(timezones);/*Prints:[  {    "name": "America/Bahia_Banderas",    "countries": [ "MX" ],    "utcOffset": -360,    "utcOffsetStr": "-06:00",    "dstOffset": -300,    "dstOffsetStr": "-05:00",    "aliasOf": null  },  {    "name": "America/Cancun",
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');
describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezonesForCountry', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.