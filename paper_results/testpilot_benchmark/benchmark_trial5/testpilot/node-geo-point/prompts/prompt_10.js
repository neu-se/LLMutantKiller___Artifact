The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
        // Test 1: Moving east from London
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = startPoint1.calculateDestination(1000, 90);
        
        // Should move east (increase longitude) while latitude stays roughly the same
        assert(endPoint1.longitude > startPoint1.longitude, 'Longitude should increase when moving east');
        assert(Math.abs(endPoint1.latitude - startPoint1.latitude) < 0.01, 'Latitude should remain roughly the same when moving east');
        
        // Test 2: Moving north
        const startPoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint2 = startPoint2.calculateDestination(1000, 0);
        
        // Should move north (increase latitude) while longitude stays roughly the same
        assert(endPoint2.latitude > startPoint2.latitude, 'Latitude should increase when moving north');
        assert(Math.abs(endPoint2.longitude - startPoint2.longitude) < 0.01, 'Longitude should remain roughly the same when moving north');
        
        // Test 3: Moving south
        const startPoint3 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint3 = startPoint3.calculateDestination(1000, 180);
        
        // Should move south (decrease latitude)
        assert(endPoint3.latitude < startPoint3.latitude, 'Latitude should decrease when moving south');
        
        // Test 4: Zero distance should return same point
        const startPoint4 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint4 = startPoint4.calculateDestination(0, 90);
        
        assert.equal(endPoint4.latitude, startPoint4.latitude, 'Zero distance should return same latitude');
        assert.equal(endPoint4.longitude, startPoint4.longitude, 'Zero distance should return same longitude');
        
        // Test 5: Verify the result is a GeoPoint instance
        const startPoint5 = new geo_point.GeoPoint(40.7128, -74.0060);
        const endPoint5 = startPoint5.calculateDestination(5000, 45);
        
        assert(endPoint5 instanceof geo_point.GeoPoint, 'Result should be a GeoPoint instance');
        assert(typeof endPoint5.latitude === 'number', 'Latitude should be a number');
        assert(typeof endPoint5.longitude === 'number', 'Longitude should be a number');
        
        done();
    });
});
``` 
failed with the following error message:
```
Zero distance should return same latitude  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.