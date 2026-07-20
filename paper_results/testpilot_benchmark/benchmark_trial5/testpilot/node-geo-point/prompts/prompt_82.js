The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let lngLatArray = [2.3522219, 48.856614];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 48.856614, 'Latitude should preserve decimal precision');
        assert.strictEqual(geoPoint.lng, 2.3522219, 'Longitude should preserve decimal precision');
        done();
    });
});
``` 
failed with the following error message:
```
Latitude should preserve decimal precision  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.