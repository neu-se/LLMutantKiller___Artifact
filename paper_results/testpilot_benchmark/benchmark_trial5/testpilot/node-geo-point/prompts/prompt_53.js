The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with negative coordinates', function(done) {
        // Test with negative coordinates
        const geoJsonPoint = {
            type: "Point",
            coordinates: [-74.006, -40.7128] // negative longitude and latitude
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.latitude(), -40.7128);
        assert.strictEqual(point.longitude(), -74.006);
        done();
    });

    })
``` 
failed with the following error message:
```
point.latitude is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.