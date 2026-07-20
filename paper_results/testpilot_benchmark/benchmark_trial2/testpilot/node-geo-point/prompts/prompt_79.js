The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with decimal precision', function(done) {
        // Test with high precision decimal coordinates
        let coords = [37.7749295, -122.4194155]; // San Francisco with high precision
        let point = geo_point.GeoPoint.fromLatLngArray(coords);
        
        assert.strictEqual(point.latitude(), 37.7749295);
        assert.strictEqual(point.longitude(), -122.4194155);
        done();
    });
});
``` 
failed with the following error message:
```
point.latitude is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.