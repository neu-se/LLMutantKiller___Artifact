let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - basic functionality', function(done) {
        // Test converting latitude/longitude to tile coordinates at zoom level 10
        let coordinate = { lat: 40.7128, lng: -74.0060 }; // New York City
        let zoom = 10;
        let tile = geo_point.GeoPoint.toTile(coordinate, zoom);
        
        assert(typeof tile === 'object', 'toTile should return an object');
        assert(typeof tile.x === 'number', 'tile.x should be a number');
        assert(typeof tile.y === 'number', 'tile.y should be a number');
        assert(Number.isInteger(tile.x), 'tile.x should be an integer');
        assert(Number.isInteger(tile.y), 'tile.y should be an integer');
        assert(tile.y >= 0, 'tile.y should be non-negative');
        done();
    });
})