let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - positive coordinates', function(done) {
        // Test with positive longitude and latitude
        let coordinate = [45, 45]; // 45 degrees east, 45 degrees north
        let zoom = 5;
        
        // Create a GeoPoint instance first
        let geoPoint = new geo_point.GeoPoint(coordinate[1], coordinate[0]); // lat, lon
        let tile = geoPoint.toTile(zoom);
        
        // Verify that we get valid tile coordinates
        assert(typeof tile.x === 'number');
        assert(typeof tile.y === 'number');
        assert(tile.x >= 0);
        assert(tile.y >= 0);
        assert(tile.x < Math.pow(2, zoom));
        assert(tile.y < Math.pow(2, zoom));
        
        done();
    });
});