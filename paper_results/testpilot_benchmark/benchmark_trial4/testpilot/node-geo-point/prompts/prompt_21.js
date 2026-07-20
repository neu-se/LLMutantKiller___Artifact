The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toString with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toString();
        assert.strictEqual(result, '40.7128,-74.0060');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ '40.7128,-74.006'
- '40.7128,-74.0060'
                  ^  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.