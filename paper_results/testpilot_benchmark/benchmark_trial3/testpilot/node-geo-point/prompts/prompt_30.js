The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with extreme coordinates', function(done) {
        // Test with boundary values
        let point4 = new geo_point.GeoPoint(90, 180);
        let obj4 = point4.toObject();
        
        assert.strictEqual(typeof obj4, 'object');
        assert.strictEqual(obj4.lat, 90);
        assert.strictEqual(obj4.lon, 180);
        
        let point5 = new geo_point.GeoPoint(-90, -180);
        let obj5 = point5.toObject();
        
        assert.strictEqual(typeof obj5, 'object');
        assert.strictEqual(obj5.lat, -90);
        assert.strictEqual(obj5.lon, -180);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 90
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.