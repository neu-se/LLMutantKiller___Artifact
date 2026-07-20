The test:
```
let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (GB)', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('GB');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        assert('Europe/London' in timezones, 'Should contain Europe/London timezone');
    });

    })
``` 
failed with the following error message:
```
Should contain Europe/London timezone  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.