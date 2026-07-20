The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
        // Test 1: Moving east from London coordinates
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = startPoint1.calculateDestination(1000, 90); // 1km east
        
        // Should move east (longitude should increase)
        assert(endPoint1.longitude > startPoint1.longitude, 'Longitude should increase when moving east');
        assert.strictEqual(Math.round(endPoint1.latitude * 1000), Math.round(startPoint1.latitude * 1000), 'Latitude should remain approximately the same when moving east');
        
        // Test 2: Moving north
        const startPoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint2 = startPoint2.calculateDestination(1000, 0); // 1km north
        
        // Should move north (latitude should increase)
        assert(endPoint2.latitude > startPoint2.latitude, 'Latitude should increase when moving north');
        assert.strictEqual(Math.round(endPoint2.longitude * 1000), Math.round(startPoint2.longitude * 1000), 'Longitude should remain approximately the same when moving north');
        
        // Test 3: Zero distance should return same point
        const startPoint3 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const endPoint3 = startPoint3.calculateDestination(0, 45);
        
        assert.strictEqual(endPoint3.latitude, startPoint3.latitude, 'Zero distance should return same latitude');
        assert.strictEqual(endPoint3.longitude, startPoint3.longitude, 'Zero distance should return same longitude');
        
        // Test 4: Moving south
        const startPoint4 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint4 = startPoint4.calculateDestination(1000, 180); // 1km south
        
        // Should move south (latitude should decrease)
        assert(endPoint4.latitude < startPoint4.latitude, 'Latitude should decrease when moving south');
        
        // Test 5: Verify the result is a GeoPoint instance
        const startPoint5 = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        const endPoint5 = startPoint5.calculateDestination(1000, 90);
        
        assert(endPoint5 instanceof geo_point.GeoPoint, 'Result should be a GeoPoint instance');
        assert(typeof endPoint5.latitude === 'number', 'Result should have numeric latitude');
        assert(typeof endPoint5.longitude === 'number', 'Result should have numeric longitude');
        
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