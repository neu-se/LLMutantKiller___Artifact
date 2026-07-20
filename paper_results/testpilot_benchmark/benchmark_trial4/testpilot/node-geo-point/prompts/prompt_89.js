The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with zero coordinates', function(done) {
        // Test with zero values
        let lngLatArray = [0, 0];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 0, 'Latitude should be 0');
        assert.strictEqual(geoPoint.lng, 0, 'Longitude should be 0');
        done();
    });

    })
``` 
failed with the following error message:
```
Latitude should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.