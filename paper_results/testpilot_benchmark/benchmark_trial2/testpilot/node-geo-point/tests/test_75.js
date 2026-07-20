let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing', function(done) {
        // Test 1: Basic bearing calculation - North direction
        const point1 = new geo_point.GeoPoint(0, 0);
        const point2 = new geo_point.GeoPoint(1, 0);
        const bearing1 = point1.calculateBearing(point2);
        assert(Math.abs(bearing1 - 0) < 0.1, `Expected bearing ~0°, got ${bearing1}`);

        // Test 2: East direction
        const point3 = new geo_point.GeoPoint(0, 0);
        const point4 = new geo_point.GeoPoint(0, 1);
        const bearing2 = point3.calculateBearing(point4);
        assert(Math.abs(bearing2 - 90) < 0.1, `Expected bearing ~90°, got ${bearing2}`);

        // Test 3: South direction
        const point5 = new geo_point.GeoPoint(1, 0);
        const point6 = new geo_point.GeoPoint(0, 0);
        const bearing3 = point5.calculateBearing(point6);
        assert(Math.abs(bearing3 - 180) < 0.1, `Expected bearing ~180°, got ${bearing3}`);

        // Test 4: West direction
        const point7 = new geo_point.GeoPoint(0, 1);
        const point8 = new geo_point.GeoPoint(0, 0);
        const bearing4 = point7.calculateBearing(point8);
        assert(Math.abs(bearing4 - 270) < 0.1, `Expected bearing ~270°, got ${bearing4}`);

        // Test 5: Same point (should return 0)
        const point9 = new geo_point.GeoPoint(51.5, -0.15);
        const point10 = new geo_point.GeoPoint(51.5, -0.15);
        const bearing5 = point9.calculateBearing(point10);
        assert(bearing5 >= 0 && bearing5 < 360, `Bearing should be between 0-360°, got ${bearing5}`);

        // Test 6: Real world example from usage
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = new geo_point.GeoPoint(52.5, -1.15);
        const bearing6 = startPoint.calculateBearing(endPoint);
        assert(bearing6 >= 0 && bearing6 < 360, `Bearing should be between 0-360°, got ${bearing6}`);
        assert(typeof bearing6 === 'number', `Bearing should be a number, got ${typeof bearing6}`);

        // Test 7: Cross-hemisphere calculation
        const point11 = new geo_point.GeoPoint(-10, 10);
        const point12 = new geo_point.GeoPoint(10, -10);
        const bearing7 = point11.calculateBearing(point12);
        assert(bearing7 >= 0 && bearing7 < 360, `Bearing should be between 0-360°, got ${bearing7}`);

        done();
    });
});