The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let array = [51.5074123, -0.1277583];
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        assert.strictEqual(geoPoint.lat, 51.5074123);
        assert.strictEqual(geoPoint.lng, -0.1277583);
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- 51.5074123  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.