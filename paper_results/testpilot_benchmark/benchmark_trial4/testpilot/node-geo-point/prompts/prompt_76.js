The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with negative coordinates', function(done) {
        // Test with negative latitude and longitude
        let array = [-33.8688, -151.2093]; // Sydney coordinates
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        assert.strictEqual(geoPoint.lat, -33.8688);
        assert.strictEqual(geoPoint.lng, -151.2093);
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