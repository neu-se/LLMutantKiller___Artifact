The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with typical longitude and latitude values
        let lngLatArray = [-122.4194, 37.7749]; // San Francisco coordinates
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 37.7749, 'Latitude should be correctly assigned');
        assert.strictEqual(geoPoint.lng, -122.4194, 'Longitude should be correctly assigned');
        done();
    });

    })
``` 
failed with the following error message:
```
Latitude should be correctly assigned  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.