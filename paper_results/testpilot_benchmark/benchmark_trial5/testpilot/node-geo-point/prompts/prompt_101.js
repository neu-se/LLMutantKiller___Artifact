The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - basic functionality', function(done) {
        // Test converting a coordinate to tile at zoom level 10
        let coordinate = [0, 0]; // [longitude, latitude]
        let zoom = 10;
        let tile = geo_point.GeoPoint.toTile(coordinate, zoom);
        
        // At zoom 10, coordinate [0,0] should map to tile [512, 512]
        assert.strictEqual(tile[0], 512);
        assert.strictEqual(tile[1], 512);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 512
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.