let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toTile', function(done) {
        // Test case 1: London coordinates at zoom level 7
        const londonPoint = new geo_point.GeoPoint(51.5, -0.15);
        const londonTile = londonPoint.toTile(7);
        
        assert(typeof londonTile.x === 'number', 'x coordinate should be a number');
        assert(typeof londonTile.y === 'number', 'y coordinate should be a number');
        assert(londonTile.x >= 0, 'x coordinate should be non-negative');
        assert(londonTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 2: Equator and Prime Meridian (0, 0) at zoom level 10
        const originPoint = new geo_point.GeoPoint(0, 0);
        const originTile = originPoint.toTile(10);
        
        assert(typeof originTile.x === 'number', 'x coordinate should be a number');
        assert(typeof originTile.y === 'number', 'y coordinate should be a number');
        
        // Test case 3: New York coordinates at zoom level 5
        const nyPoint = new geo_point.GeoPoint(40.7128, -74.0060);
        const nyTile = nyPoint.toTile(5);
        
        assert(typeof nyTile.x === 'number', 'x coordinate should be a number');
        assert(typeof nyTile.y === 'number', 'y coordinate should be a number');
        assert(nyTile.x >= 0, 'x coordinate should be non-negative');
        assert(nyTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 4: Test that different zoom levels produce different results
        const testPoint = new geo_point.GeoPoint(51.5, -0.15);
        const tile1 = testPoint.toTile(1);
        const tile10 = testPoint.toTile(10);
        
        assert(tile1.x !== tile10.x || tile1.y !== tile10.y, 'Different zoom levels should produce different tile coordinates');
        
        // Test case 5: Test edge case - extreme coordinates
        const extremePoint = new geo_point.GeoPoint(85, 179);
        const extremeTile = extremePoint.toTile(3);
        
        assert(typeof extremeTile.x === 'number', 'x coordinate should be a number for extreme coordinates');
        assert(typeof extremeTile.y === 'number', 'y coordinate should be a number for extreme coordinates');
        
        done();
    });
});