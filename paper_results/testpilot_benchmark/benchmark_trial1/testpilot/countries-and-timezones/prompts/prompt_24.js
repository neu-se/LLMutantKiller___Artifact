The test:
```
let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return empty object for invalid country code', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('INVALID');
        
        assert(timezones !== null, 'Result should not be null');
        assert(typeof timezones === 'object', 'Result should be an object');
        assert(Object.keys(timezones).length === 0, 'Invalid country should return empty object');
        
        done();
    });

    })
``` 
failed with the following error message:
```
Result should not be null  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.