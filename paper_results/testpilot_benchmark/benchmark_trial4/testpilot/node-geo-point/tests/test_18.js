let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDistance', function(done) {
        // Test 1: Calculate distance between two points in London area
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = new geo_point.GeoPoint(52.5, -1.15);
        const distance = startPoint.calculateDistance(endPoint);
        
        // Distance should be a positive number
        assert(typeof distance === 'number', 'Distance should be a number');
        assert(distance > 0, 'Distance should be positive');
        
        // Test 2: Calculate distance between same points (should be 0)
        const samePoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const samePoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const zeroDistance = samePoint1.calculateDistance(samePoint2);
        
        assert.strictEqual(zeroDistance, 0, 'Distance between same points should be 0');
        
        // Test 3: Calculate distance between nearby points
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const point2 = new geo_point.GeoPoint(51.6, -0.15);
        const shortDistance = point1.calculateDistance(point2);
        
        assert(typeof shortDistance === 'number', 'Short distance should be a number');
        assert(shortDistance > 0, 'Short distance should be positive');
        assert(shortDistance < distance, 'Short distance should be less than long distance');
        
        // Test 4: Test symmetry - distance from A to B should equal distance from B to A
        const pointA = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const pointB = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        const distanceAB = pointA.calculateDistance(pointB);
        const distanceBA = pointB.calculateDistance(pointA);
        
        assert.strictEqual(distanceAB, distanceBA, 'Distance should be symmetric');
        
        // Test 5: Test with extreme coordinates
        const northPole = new geo_point.GeoPoint(90, 0);
        const southPole = new geo_point.GeoPoint(-90, 0);
        const poleDistance = northPole.calculateDistance(southPole);
        
        assert(typeof poleDistance === 'number', 'Pole distance should be a number');
        assert(poleDistance > 0, 'Pole distance should be positive');
        
        done();
    });
});