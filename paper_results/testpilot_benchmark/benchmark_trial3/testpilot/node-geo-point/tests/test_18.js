let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDistance', function(done) {
        // Test 1: Basic distance calculation between two points
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = new geo_point.GeoPoint(52.5, -1.15);
        const distance = startPoint.calculateDistance(endPoint);
        
        // Distance should be a positive number
        assert(typeof distance === 'number', 'Distance should be a number');
        assert(distance > 0, 'Distance should be positive');
        
        // Test 2: Distance between same points should be 0
        const samePoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const samePoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const zeroDistance = samePoint1.calculateDistance(samePoint2);
        assert.strictEqual(zeroDistance, 0, 'Distance between identical points should be 0');
        
        // Test 3: Distance calculation should be symmetric
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const point2 = new geo_point.GeoPoint(51.6, -0.15);
        const distance1to2 = point1.calculateDistance(point2);
        const distance2to1 = point2.calculateDistance(point1);
        assert.strictEqual(distance1to2, distance2to1, 'Distance should be symmetric');
        
        // Test 4: Verify the instance method calls the static method
        const testPoint1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const testPoint2 = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        const instanceDistance = testPoint1.calculateDistance(testPoint2);
        const staticDistance = geo_point.GeoPoint.calculateDistance(testPoint1, testPoint2);
        assert.strictEqual(instanceDistance, staticDistance, 'Instance method should return same result as static method');
        
        done();
    });
});