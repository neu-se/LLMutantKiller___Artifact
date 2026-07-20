The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with zero coordinates', function(done) {
        // Test with coordinates at origin
        const geoJsonPoint = {
            type: "Point",
            coordinates: [0, 0]
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.latitude(), 0);
        assert.strictEqual(point.longitude(), 0);
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