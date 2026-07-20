let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateBearing', function(done) {
        // Test 1: Bearing from point to itself should be 0
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let bearing1 = point1.calculateBearing(point1);
        assert.strictEqual(bearing1, 0, 'Bearing from point to itself should be 0');

        // Test 2: Bearing from New York to London (approximately northeast)
        let nyc = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let london = new geo_point.GeoPoint(51.5074, -0.1278); // London
        let bearing2 = nyc.calculateBearing(london);
        assert(bearing2 >= 0 && bearing2 <= 360, 'Bearing should be between 0 and 360 degrees');
        assert(bearing2 > 45 && bearing2 < 90, 'Bearing from NYC to London should be roughly northeast');

        // Test 3: Bearing due north (0 degrees)
        let origin = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        let north = new geo_point.GeoPoint(1, 0); // 1 degree north
        let bearing3 = origin.calculateBearing(north);
        assert(Math.abs(bearing3 - 0) < 1, 'Bearing due north should be close to 0 degrees');

        // Test 4: Bearing due east (90 degrees)
        let east = new geo_point.GeoPoint(0, 1); // 1 degree east
        let bearing4 = origin.calculateBearing(east);
        assert(Math.abs(bearing4 - 90) < 1, 'Bearing due east should be close to 90 degrees');

        // Test 5: Bearing due south (180 degrees)
        let south = new geo_point.GeoPoint(-1, 0); // 1 degree south
        let bearing5 = origin.calculateBearing(south);
        assert(Math.abs(bearing5 - 180) < 1, 'Bearing due south should be close to 180 degrees');

        // Test 6: Bearing due west (270 degrees)
        let west = new geo_point.GeoPoint(0, -1); // 1 degree west
        let bearing6 = origin.calculateBearing(west);
        assert(Math.abs(bearing6 - 270) < 1, 'Bearing due west should be close to 270 degrees');

        done();
    });
});