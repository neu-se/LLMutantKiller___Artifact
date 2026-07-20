let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile', function(done) {
        // Test case 1: London coordinates at zoom level 7
        const londonPoint = new geo_point.GeoPoint(51.5, -0.15);
        const londonTile = londonPoint.toTile(7);
        
        assert(typeof londonTile.x === 'number', 'x coordinate should be a number');
        assert(typeof londonTile.y === 'number', 'y coordinate should be a number');
        assert(londonTile.x >= 0, 'x coordinate should be non-negative');
        assert(londonTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 2: Equator and Prime Meridian (0, 0) at zoom level 1
        const originPoint = new geo_point.GeoPoint(0, 0);
        const originTile = originPoint.toTile(1);
        
        assert.strictEqual(originTile.x, 1, 'Tile x at origin should be 1 at zoom level 1');
        assert.strictEqual(originTile.y, 1, 'Tile y at origin should be 1 at zoom level 1');
        
        // Test case 3: New York coordinates at zoom level 10
        const nyPoint = new geo_point.GeoPoint(40.7128, -74.0060);
        const nyTile = nyPoint.toTile(10);
        
        assert(nyTile.x >= 0 && nyTile.x < Math.pow(2, 10), 'x should be within valid range for zoom level 10');
        assert(nyTile.y >= 0 && nyTile.y < Math.pow(2, 10), 'y should be within valid range for zoom level 10');
        
        // Test case 4: Test that higher zoom levels produce larger tile numbers
        const testPoint = new geo_point.GeoPoint(45.0, 45.0);
        const lowZoomTile = testPoint.toTile(5);
        const highZoomTile = testPoint.toTile(10);
        
        assert(highZoomTile.x > lowZoomTile.x, 'Higher zoom should produce larger x tile numbers');
        assert(highZoomTile.y > lowZoomTile.y, 'Higher zoom should produce larger y tile numbers');
        
        // Test case 5: Edge case - North pole approximation
        const northPoint = new geo_point.GeoPoint(85, 0);
        const northTile = northPoint.toTile(5);
        
        assert(typeof northTile.x === 'number', 'North pole x should be a number');
        assert(typeof northTile.y === 'number', 'North pole y should be a number');
        assert(northTile.y >= 0, 'North pole y should be non-negative');
        
        done();
    });
});