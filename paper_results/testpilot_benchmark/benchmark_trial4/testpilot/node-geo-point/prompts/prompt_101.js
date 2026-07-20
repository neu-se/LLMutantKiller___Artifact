The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - different zoom levels', function(done) {
        let coordinate = { lat: 51.5074, lng: -0.1278 }; // London
        
        // Test zoom level 0
        let tile0 = geo_point.GeoPoint.toTile(coordinate, 0);
        assert(tile0.x >= 0 && tile0.x < 1, 'At zoom 0, x should be 0');
        assert(tile0.y >= 0 && tile0.y < 1, 'At zoom 0, y should be 0');
        
        // Test zoom level 1
        let tile1 = geo_point.GeoPoint.toTile(coordinate, 1);
        assert(tile1.x >= 0 && tile1.x < 2, 'At zoom 1, x should be 0 or 1');
        assert(tile1.y >= 0 && tile1.y < 2, 'At zoom 1, y should be 0 or 1');
        
        done();
    });

    })
``` 
failed with the following error message:
```
At zoom 0, x should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.