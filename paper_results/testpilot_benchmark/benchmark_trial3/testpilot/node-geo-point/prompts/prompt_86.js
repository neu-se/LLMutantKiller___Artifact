The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with extreme coordinates', function(done) {
        // Test with boundary values
        let lngLatArray = [180, 90]; // Maximum longitude and latitude
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 90);
        assert.strictEqual(geoPoint.lng, 180);
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 90
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.