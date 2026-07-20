let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - extreme coordinates', function(done) {
        // Test with extreme valid coordinates
        let coordinate1 = [179.9, 85]; // Near maximum longitude and latitude (avoid exact 180)
        let coordinate2 = [-180, -85]; // Near minimum longitude and latitude
        let zoom = 8;
        
        let tile1 = geo_point.GeoPoint.toTile(coordinate1, zoom);
        let tile2 = geo_point.GeoPoint.toTile(coordinate2, zoom);
        
        // Both should produce valid tile coordinates
        assert(tile1[0] >= 0 && tile1[0] < Math.pow(2, zoom));
        assert(tile1[1] >= 0 && tile1[1] < Math.pow(2, zoom));
        assert(tile2[0] >= 0 && tile2[0] < Math.pow(2, zoom));
        assert(tile2[1] >= 0 && tile2[1] < Math.pow(2, zoom));
        
        done();
    });
});