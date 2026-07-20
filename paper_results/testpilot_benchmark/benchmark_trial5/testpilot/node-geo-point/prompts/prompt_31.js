The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with valid coordinates', function(done) {
        // Test with positive coordinates
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060);
        let obj1 = point1.toObject();
        
        assert.strictEqual(typeof obj1, 'object');
        assert.strictEqual(obj1.lat, 40.7128);
        assert.strictEqual(obj1.lon, -74.0060);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- 40.7128  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.