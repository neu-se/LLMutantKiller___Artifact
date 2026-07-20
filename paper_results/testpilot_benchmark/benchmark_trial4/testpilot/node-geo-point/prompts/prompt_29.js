The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with negative coordinates', function(done) {
        // Test with negative coordinates
        let point3 = new geo_point.GeoPoint(-33.8688, -151.2093);
        let obj3 = point3.toObject();
        
        assert.strictEqual(typeof obj3, 'object');
        assert.strictEqual(obj3.lat, -33.8688);
        assert.strictEqual(obj3.lon, -151.2093);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- -33.8688  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.