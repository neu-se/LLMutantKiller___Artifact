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

        // Test 2: Distance between known points (approximate)
        let nyc = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let la = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        let distance2 = nyc.calculateDistance(la);
        assert(distance2 > 0, 'Distance should be positive');
        assert(distance2 > 3900 && distance2 < 4100, 'Distance between NYC and LA should be approximately 3944 km');

        // Test 3: Distance calculation should be symmetric
        let london = new geo_point.GeoPoint(51.5074, -0.1278);
        let paris = new geo_point.GeoPoint(48.8566, 2.3522);
        let distance3a = london.calculateDistance(paris);
        let distance3b = paris.calculateDistance(london);
        assert.strictEqual(distance3a, distance3b, 'Distance calculation should be symmetric');

        // Test 4: Distance between points on equator
        let equator1 = new geo_point.GeoPoint(0, 0);
        let equator2 = new geo_point.GeoPoint(0, 1);
        let distance4 = equator1.calculateDistance(equator2);
        assert(distance4 > 110 && distance4 < 112, 'Distance of 1 degree on equator should be approximately 111 km');

        // Test 5: Distance between north and south pole
        let northPole = new geo_point.GeoPoint(90, 0);
        let southPole = new geo_point.GeoPoint(-90, 0);
        let distance5 = northPole.calculateDistance(southPole);
        assert(distance5 > 20000 && distance5 < 20100, 'Distance between poles should be approximately half Earth circumference');

        done();
    });
});