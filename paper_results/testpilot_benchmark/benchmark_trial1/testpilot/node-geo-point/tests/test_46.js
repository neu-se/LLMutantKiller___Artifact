let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toTile', function(done) {
        // Test case 1: Basic tile calculation for a known location
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let tile1 = point1.toTile(10);
        assert(typeof tile1 === 'object', 'toTile should return an object');
        assert(typeof tile1.x === 'number', 'tile should have numeric x coordinate');
        assert(typeof tile1.y === 'number', 'tile should have numeric y coordinate');
        assert(tile1.x >= 0, 'tile x coordinate should be non-negative');
        assert(tile1.y >= 0, 'tile y coordinate should be non-negative');

        // Test case 2: Equator and Prime Meridian (0, 0)
        let point2 = new geo_point.GeoPoint(0, 0);
        let tile2 = point2.toTile(1);
        assert(typeof tile2.x === 'number', 'tile x should be a number for (0,0)');
        assert(typeof tile2.y === 'number', 'tile y should be a number for (0,0)');

        // Test case 3: Different zoom levels should give different results
        let point3 = new geo_point.GeoPoint(51.5074, -0.1278); // London
        let tile3_zoom5 = point3.toTile(5);
        let tile3_zoom10 = point3.toTile(10);
        assert(tile3_zoom5.x !== tile3_zoom10.x || tile3_zoom5.y !== tile3_zoom10.y, 
               'Different zoom levels should produce different tile coordinates');

        // Test case 4: Higher zoom should give larger tile numbers
        let point4 = new geo_point.GeoPoint(35.6762, 139.6503); // Tokyo
        let tile4_low = point4.toTile(5);
        let tile4_high = point4.toTile(10);
        assert(tile4_high.x > tile4_low.x, 'Higher zoom should generally give larger x coordinates');
        assert(tile4_high.y > tile4_low.y, 'Higher zoom should generally give larger y coordinates');

        // Test case 5: Extreme coordinates
        let point5 = new geo_point.GeoPoint(85, 179); // Near max lat/lon
        let tile5 = point5.toTile(8);
        assert(typeof tile5.x === 'number', 'Should handle extreme coordinates');
        assert(typeof tile5.y === 'number', 'Should handle extreme coordinates');
        assert(tile5.x >= 0, 'Extreme coordinates should still produce valid tiles');
        assert(tile5.y >= 0, 'Extreme coordinates should still produce valid tiles');

        done();
    });
});