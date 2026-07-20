let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let coordinate = [-45, -45]; // 45 degrees west, 45 degrees south
        let zoom = 5;
        let tile = geo_point.GeoPoint.toTile(coordinate, zoom);
        
        // Verify that we get valid tile coordinates
        assert(typeof tile[0] === 'number');
        assert(typeof tile[1] === 'number');
        assert(tile[0] >= 0);
        assert(tile[1] >= 0);
        assert(tile[0] < Math.pow(2, zoom));
        assert(tile[1] < Math.pow(2, zoom));
        
        done();
    });

    })