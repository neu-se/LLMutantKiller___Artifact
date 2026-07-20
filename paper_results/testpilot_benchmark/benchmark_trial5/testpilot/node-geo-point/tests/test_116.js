let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - extreme coordinates', function(done) {
        // Test with coordinates at the edges of valid ranges
        let zoom = 8;
        
        // Test maximum longitude and latitude
        let maxCoord = [179.9, 85]; // Near max valid values
        let maxTile = geo_point.GeoPoint.toTile(maxCoord, zoom);
        assert(maxTile[0] >= 0 && maxTile[0] < Math.pow(2, zoom));
        assert(maxTile[1] >= 0 && maxTile[1] < Math.pow(2, zoom));
        
        // Test minimum longitude and latitude
        let minCoord = [-179.9, -85]; // Near min valid values
        let minTile = geo_point.GeoPoint.toTile(minCoord, zoom);
        assert(minTile[0] >= 0 && minTile[0] < Math.pow(2, zoom));
        assert(minTile[1] >= 0 && minTile[1] < Math.pow(2, zoom));
        
        done();
    });
});