let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let longitude = -45; // 45 degrees west
        let latitude = -45;  // 45 degrees south
        let zoom = 5;
        
        // Create a GeoPoint instance first
        let geoPoint = new geo_point.GeoPoint(latitude, longitude);
        let tile = geoPoint.toTile(zoom);
        
        // Verify that we get valid tile coordinates
        assert(tile !== null && tile !== undefined, 'Tile should not be null or undefined');
        assert(typeof tile.x === 'number', 'Tile x coordinate should be a number');
        assert(typeof tile.y === 'number', 'Tile y coordinate should be a number');
        assert(tile.x >= 0, 'Tile x should be non-negative');
        assert(tile.y >= 0, 'Tile y should be non-negative');
        assert(tile.x < Math.pow(2, zoom), 'Tile x should be within valid range');
        assert(tile.y < Math.pow(2, zoom), 'Tile y should be within valid range');
        
        done();
    });
});