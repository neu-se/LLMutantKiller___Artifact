The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let point = geo_point.GeoPoint.fromLngLatArray([123.456789, 45.678901]);
        assert.strictEqual(point.longitude(), 123.456789);
        assert.strictEqual(point.latitude(), 45.678901);
        done();
    });
});
``` 
failed with the following error message:
```
point.longitude is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.