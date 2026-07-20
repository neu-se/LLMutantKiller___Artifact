The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - different zoom levels', function(done) {
        let coordinate = [0, 0];
        
        // Test zoom level 0 - should be [0, 0]
        let tile0 = geo_point.GeoPoint.toTile(coordinate, 0);
        assert.strictEqual(tile0[0], 0);
        assert.strictEqual(tile0[1], 0);
        
        // Test zoom level 1 - should be [1, 1]
        let tile1 = geo_point.GeoPoint.toTile(coordinate, 1);
        assert.strictEqual(tile1[0], 1);
        assert.strictEqual(tile1[1], 1);
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 0
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.