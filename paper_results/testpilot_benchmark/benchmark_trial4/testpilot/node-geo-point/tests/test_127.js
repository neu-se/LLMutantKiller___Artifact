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
        
        assert(typeof originTile.x === 'number', 'x coordinate should be a number');
        assert(typeof originTile.y === 'number', 'y coordinate should be a number');
        assert(originTile.x >= 0, 'x coordinate should be non-negative');
        assert(originTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 3: New York coordinates at zoom level 10
        const nyPoint = new geo_point.GeoPoint(40.7128, -74.0060);
        const nyTile = nyPoint.toTile(10);
        
        assert(typeof nyTile.x === 'number', 'x coordinate should be a number');
        assert(typeof nyTile.y === 'number', 'y coordinate should be a number');
        assert(nyTile.x >= 0, 'x coordinate should be non-negative');
        assert(nyTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 4: Verify tile coordinates are within expected bounds for zoom level
        const testPoint = new geo_point.GeoPoint(45.0, 90.0);
        const testTile = testPoint.toTile(5);
        const maxTileCoord = Math.pow(2, 5); // 2^zoom
        
        assert(testTile.x < maxTileCoord, `x coordinate should be less than ${maxTileCoord} for zoom level 5`);
        assert(testTile.y < maxTileCoord, `y coordinate should be less than ${maxTileCoord} for zoom level 5`);
        
        done();
    });
});