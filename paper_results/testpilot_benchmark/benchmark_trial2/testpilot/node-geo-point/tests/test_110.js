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
        
        // Test case 2: Equator and Prime Meridian (0, 0) at zoom level 0
        const originPoint = new geo_point.GeoPoint(0, 0);
        const originTile = originPoint.toTile(0);
        
        assert.strictEqual(originTile.x, 0, 'Origin point should map to tile (0,0) at zoom 0');
        assert.strictEqual(originTile.y, 0, 'Origin point should map to tile (0,0) at zoom 0');
        
        // Test case 3: Different zoom levels should produce different results
        const testPoint = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const tile1 = testPoint.toTile(1);
        const tile5 = testPoint.toTile(5);
        const tile10 = testPoint.toTile(10);
        
        assert(tile1.x !== tile5.x || tile1.y !== tile5.y, 'Different zoom levels should produce different tiles');
        assert(tile5.x !== tile10.x || tile5.y !== tile10.y, 'Different zoom levels should produce different tiles');
        
        // Test case 4: Tile coordinates should be within valid range for zoom level
        const maxTileCoord = Math.pow(2, 7) - 1;
        assert(londonTile.x <= maxTileCoord, 'x coordinate should be within valid range for zoom level');
        assert(londonTile.y <= maxTileCoord, 'y coordinate should be within valid range for zoom level');
        
        // Test case 5: Extreme coordinates
        const northPole = new geo_point.GeoPoint(85, 0);
        const southPole = new geo_point.GeoPoint(-85, 0);
        const northTile = northPole.toTile(5);
        const southTile = southPole.toTile(5);
        
        assert(typeof northTile.x === 'number' && typeof northTile.y === 'number', 'North pole should produce valid tile coordinates');
        assert(typeof southTile.x === 'number' && typeof southTile.y === 'number', 'South pole should produce valid tile coordinates');
        
        done();
    });
});