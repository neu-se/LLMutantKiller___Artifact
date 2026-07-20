let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - equator and prime meridian', function(done) {
        // Test with coordinates at equator and prime meridian
        let coordinate = { lat: 0, lng: 0 };
        let zoom = 5;
        let tile = geo_point.GeoPoint.toTile(coordinate, zoom);
        
        assert(typeof tile.x === 'number', 'tile.x should be a number');
        assert(typeof tile.y === 'number', 'tile.y should be a number');
        assert(tile.x >= 0, 'tile.x should be non-negative');
        assert(tile.y >= 0, 'tile.y should be non-negative');
        done();
    });

    })