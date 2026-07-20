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

        // Test case 2: Different zoom levels should produce different results
        let point2 = new geo_point.GeoPoint(51.5074, -0.1278); // London
        let tile2_zoom5 = point2.toTile(5);
        let tile2_zoom10 = point2.toTile(10);
        assert(tile2_zoom5.x !== tile2_zoom10.x || tile2_zoom5.y !== tile2_zoom10.y, 
               'Different zoom levels should produce different tile coordinates');

        // Test case 3: Equator and Prime Meridian (0, 0)
        let point3 = new geo_point.GeoPoint(0, 0);
        let tile3 = point3.toTile(1);
        assert(typeof tile3.x === 'number', 'tile x should be numeric for equator/prime meridian');
        assert(typeof tile3.y === 'number', 'tile y should be numeric for equator/prime meridian');

        // Test case 4: Higher zoom level should produce larger tile numbers
        let point4 = new geo_point.GeoPoint(37.7749, -122.4194); // San Francisco
        let tile4_zoom1 = point4.toTile(1);
        let tile4_zoom15 = point4.toTile(15);
        assert(tile4_zoom15.x > tile4_zoom1.x, 'Higher zoom should produce larger x coordinates');
        assert(tile4_zoom15.y > tile4_zoom1.y, 'Higher zoom should produce larger y coordinates');

        // Test case 5: Edge case - minimum zoom
        let point5 = new geo_point.GeoPoint(45.0, 90.0);
        let tile5 = point5.toTile(0);
        assert(typeof tile5.x === 'number', 'tile x should be numeric at zoom 0');
        assert(typeof tile5.y === 'number', 'tile y should be numeric at zoom 0');

        done();
    });
});