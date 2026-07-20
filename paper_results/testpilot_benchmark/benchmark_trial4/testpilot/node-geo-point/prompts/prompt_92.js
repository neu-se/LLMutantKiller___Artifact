The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with boundary values', function(done) {
        // Test with longitude and latitude boundary values
        let point = geo_point.GeoPoint.fromLngLatArray([180, 90]);
        assert.strictEqual(point.longitude(), 180);
        assert.strictEqual(point.latitude(), 90);
        done();
    });

    })
``` 
failed with the following error message:
```
point.longitude is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.