The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let lngLatArray = [-74.0060, -40.7128];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, -40.7128);
        assert.strictEqual(geoPoint.lng, -74.0060);
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- -40.7128  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.