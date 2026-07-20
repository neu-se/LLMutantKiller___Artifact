The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
        // Test 1: Calculate destination point moving east (90 degrees) from London
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = startPoint1.calculateDestination(1000, 90);
        
        // Moving east should increase longitude, latitude should remain approximately the same
        assert(endPoint1.longitude > startPoint1.longitude, 'Longitude should increase when moving east');
        assert(Math.abs(endPoint1.latitude - startPoint1.latitude) < 0.01, 'Latitude should remain approximately the same when moving east');
        
        // Test 2: Calculate destination point moving north (0 degrees)
        const startPoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint2 = startPoint2.calculateDestination(1000, 0);
        
        // Moving north should increase latitude, longitude should remain approximately the same
        assert(endPoint2.latitude > startPoint2.latitude, 'Latitude should increase when moving north');
        assert(Math.abs(endPoint2.longitude - startPoint2.longitude) < 0.01, 'Longitude should remain approximately the same when moving north');
        
        // Test 3: Calculate destination point moving south (180 degrees)
        const startPoint3 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint3 = startPoint3.calculateDestination(1000, 180);
        
        // Moving south should decrease latitude
        assert(endPoint3.latitude < startPoint3.latitude, 'Latitude should decrease when moving south');
        
        // Test 4: Zero distance should return the same point
        const startPoint4 = new geo_point.GeoPoint(40.7128, -74.0060);
        const endPoint4 = startPoint4.calculateDestination(0, 45);
        
        assert.strictEqual(endPoint4.latitude, startPoint4.latitude, 'Zero distance should return same latitude');
        assert.strictEqual(endPoint4.longitude, startPoint4.longitude, 'Zero distance should return same longitude');
        
        // Test 5: Verify the result is a GeoPoint instance
        const startPoint5 = new geo_point.GeoPoint(35.6762, 139.6503);
        const endPoint5 = startPoint5.calculateDestination(500, 270);
        
        assert(endPoint5 instanceof geo_point.GeoPoint, 'Result should be an instance of GeoPoint');
        assert(typeof endPoint5.latitude === 'number', 'Result latitude should be a number');
        assert(typeof endPoint5.longitude === 'number', 'Result longitude should be a number');
        
        done();
    });
});
``` 
failed with the following error message:
```
Zero distance should return same longitude  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.