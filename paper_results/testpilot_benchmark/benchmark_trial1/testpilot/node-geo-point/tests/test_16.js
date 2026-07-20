let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDistance', function(done) {
        // Test 1: Distance between same point should be 0
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let point2 = new geo_point.GeoPoint(40.7128, -74.0060); // Same location
        let distance1 = point1.calculateDistance(point2);
        assert.strictEqual(distance1, 0, 'Distance between identical points should be 0');

        // Test 2: Distance between two different points should be positive
        let point3 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let point4 = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        let distance2 = point3.calculateDistance(point4);
        assert(distance2 > 0, 'Distance between different points should be positive');

        // Test 3: Distance should be symmetric (A to B = B to A)
        let point5 = new geo_point.GeoPoint(51.5074, -0.1278); // London
        let point6 = new geo_point.GeoPoint(48.8566, 2.3522); // Paris
        let distance3 = point5.calculateDistance(point6);
        let distance4 = point6.calculateDistance(point5);
        assert.strictEqual(distance3, distance4, 'Distance should be symmetric');

        // Test 4: Test with points at different hemispheres
        let point7 = new geo_point.GeoPoint(40.7128, -74.0060); // New York (North, West)
        let point8 = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney (South, East)
        let distance5 = point7.calculateDistance(point8);
        assert(distance5 > 0, 'Distance between points in different hemispheres should be positive');

        // Test 5: Test with equatorial points
        let point9 = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        let point10 = new geo_point.GeoPoint(0, 90); // Equator, 90 degrees East
        let distance6 = point9.calculateDistance(point10);
        assert(distance6 > 0, 'Distance between equatorial points should be positive');

        done();
    });
});