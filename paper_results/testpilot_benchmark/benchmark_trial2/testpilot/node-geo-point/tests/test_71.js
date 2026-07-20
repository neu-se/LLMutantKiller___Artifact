let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDistance', function(done) {
        // Test 1: Distance between two different points
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const point2 = new geo_point.GeoPoint(52.5, -1.15);
        const distance1 = geo_point.GeoPoint.calculateDistance(point1, point2);
        
        // Distance should be positive and reasonable (approximately 140km)
        assert(distance1 > 0, 'Distance should be positive');
        assert(distance1 > 100000 && distance1 < 200000, 'Distance should be approximately 140km');
        
        // Test 2: Distance between same points should be 0
        const samePoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const samePoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const distance2 = geo_point.GeoPoint.calculateDistance(samePoint1, samePoint2);
        
        assert.strictEqual(distance2, 0, 'Distance between identical points should be 0');
        
        // Test 3: Small distance calculation
        const closePoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const closePoint2 = new geo_point.GeoPoint(51.6, -0.15);
        const distance3 = geo_point.GeoPoint.calculateDistance(closePoint1, closePoint2);
        
        // Should be approximately 11km (0.1 degree latitude difference)
        assert(distance3 > 10000 && distance3 < 12000, 'Distance should be approximately 11km');
        
        // Test 4: Symmetry - distance from A to B should equal distance from B to A
        const pointA = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const pointB = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        const distanceAB = geo_point.GeoPoint.calculateDistance(pointA, pointB);
        const distanceBA = geo_point.GeoPoint.calculateDistance(pointB, pointA);
        
        assert.strictEqual(distanceAB, distanceBA, 'Distance should be symmetric');
        
        // Test 5: Cross-hemisphere calculation
        const northPoint = new geo_point.GeoPoint(45.0, 0.0);
        const southPoint = new geo_point.GeoPoint(-45.0, 0.0);
        const crossDistance = geo_point.GeoPoint.calculateDistance(northPoint, southPoint);
        
        // Should be approximately 10,000km (90 degrees latitude difference)
        assert(crossDistance > 9000000 && crossDistance < 11000000, 'Cross-hemisphere distance should be approximately 10,000km');
        
        done();
    });
});