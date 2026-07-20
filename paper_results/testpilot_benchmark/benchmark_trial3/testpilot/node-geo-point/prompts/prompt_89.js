The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with typical longitude/latitude values
        let lngLatArray = [-122.4194, 37.7749]; // San Francisco coordinates
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Verify that latitude (array[1]) becomes the first parameter
        assert.strictEqual(geoPoint.lat, 37.7749);
        // Verify that longitude (array[0]) becomes the second parameter  
        assert.strictEqual(geoPoint.lng, -122.4194);
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- 37.7749  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.