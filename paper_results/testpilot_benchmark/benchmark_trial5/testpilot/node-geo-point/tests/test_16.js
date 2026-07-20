let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDistance', function(done) {
        // Test 1: Distance between same points should be 0
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let point2 = new geo_point.GeoPoint(40.7128, -74.0060); // Same location
        let distance1 = point1.calculateDistance(point2);
        assert.strictEqual(distance1, 0, 'Distance between identical points should be 0');

        // Test 2: Distance between different points should be positive
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

        // Test 4: Test with points at equator
        let point7 = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        let point8 = new geo_point.GeoPoint(0, 1); // Equator, 1 degree east
        let distance5 = point7.calculateDistance(point8);
        assert(distance5 > 0, 'Distance along equator should be positive');

        // Test 5: Test with polar coordinates
        let point9 = new geo_point.GeoPoint(90, 0); // North Pole
        let point10 = new geo_point.GeoPoint(-90, 0); // South Pole
        let distance6 = point9.calculateDistance(point10);
        assert(distance6 > 0, 'Distance between poles should be positive');

        done();
    });
});