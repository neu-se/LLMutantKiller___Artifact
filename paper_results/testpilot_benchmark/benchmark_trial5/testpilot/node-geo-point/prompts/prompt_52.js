The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with extreme coordinates', function(done) {
        // Test with boundary values
        const geoJsonPoint = {
            type: "Point",
            coordinates: [180, 90] // max longitude and latitude
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.latitude(), 90);
        assert.strictEqual(point.longitude(), 180);
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