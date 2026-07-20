The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.adjustPrecision', function(done) {
        // Test adjusting precision to 2 decimal places
        let point1 = new geo_point.GeoPoint(40.123456, -74.987654);
        let adjusted1 = point1.adjustPrecision(2);
        assert.strictEqual(adjusted1.latitude(), 40.12);
        assert.strictEqual(adjusted1.longitude(), -74.99);
        
        // Test adjusting precision to 0 decimal places (integers)
        let point2 = new geo_point.GeoPoint(40.789, -74.321);
        let adjusted2 = point2.adjustPrecision(0);
        assert.strictEqual(adjusted2.latitude(), 41);
        assert.strictEqual(adjusted2.longitude(), -74);
        
        // Test adjusting precision to 4 decimal places
        let point3 = new geo_point.GeoPoint(40.123456789, -74.987654321);
        let adjusted3 = point3.adjustPrecision(4);
        assert.strictEqual(adjusted3.latitude(), 40.1235);
        assert.strictEqual(adjusted3.longitude(), -74.9877);
        
        // Test with negative coordinates
        let point4 = new geo_point.GeoPoint(-40.555555, 74.777777);
        let adjusted4 = point4.adjustPrecision(1);
        assert.strictEqual(adjusted4.latitude(), -40.6);
        assert.strictEqual(adjusted4.longitude(), 74.8);
        
        // Test that original point is not modified
        let point5 = new geo_point.GeoPoint(40.123456, -74.987654);
        let originalLat = point5.latitude();
        let originalLng = point5.longitude();
        point5.adjustPrecision(2);
        assert.strictEqual(point5.latitude(), originalLat);
        assert.strictEqual(point5.longitude(), originalLng);
        
        done();
    });
});
``` 
failed with the following error message:
```
adjusted1.latitude is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.