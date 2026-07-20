let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toTile', function(done) {
        // Test case 1: Basic functionality with London coordinates
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const tile1 = point1.toTile(7);
        
        assert(typeof tile1 === 'object', 'toTile should return an object');
        assert(typeof tile1.x === 'number', 'tile.x should be a number');
        assert(typeof tile1.y === 'number', 'tile.y should be a number');
        assert(tile1.x >= 0, 'tile.x should be non-negative');
        assert(tile1.y >= 0, 'tile.y should be non-negative');
        
        // Test case 2: Different zoom level
        const tile2 = point1.toTile(10);
        assert(typeof tile2 === 'object', 'toTile should return an object at zoom 10');
        assert(typeof tile2.x === 'number', 'tile.x should be a number at zoom 10');
        assert(typeof tile2.y === 'number', 'tile.y should be a number at zoom 10');
        
        // Test case 3: Equator and Prime Meridian (0, 0)
        const point2 = new geo_point.GeoPoint(0, 0);
        const tile3 = point2.toTile(5);
        assert(typeof tile3 === 'object', 'toTile should work for coordinates (0, 0)');
        assert(typeof tile3.x === 'number', 'tile.x should be a number for (0, 0)');
        assert(typeof tile3.y === 'number', 'tile.y should be a number for (0, 0)');
        
        // Test case 4: Negative coordinates
        const point3 = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const tile4 = point3.toTile(8);
        assert(typeof tile4 === 'object', 'toTile should work for negative latitude');
        assert(typeof tile4.x === 'number', 'tile.x should be a number for negative latitude');
        assert(typeof tile4.y === 'number', 'tile.y should be a number for negative latitude');
        
        // Test case 5: Higher zoom level should produce larger tile coordinates
        const point4 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const tileZoom5 = point4.toTile(5);
        const tileZoom8 = point4.toTile(8);
        
        // At higher zoom levels, tile coordinates should generally be larger
        assert(tileZoom8.x > tileZoom5.x || tileZoom8.y > tileZoom5.y, 
               'Higher zoom should generally produce larger tile coordinates');
        
        done();
    });
});