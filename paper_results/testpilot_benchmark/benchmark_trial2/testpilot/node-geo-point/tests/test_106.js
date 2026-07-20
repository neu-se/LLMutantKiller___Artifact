let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - basic functionality', function(done) {
        // Test converting a coordinate to tile at zoom level 10
        let coordinate = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let tile = coordinate.toTile(10);
        
        assert(typeof tile === 'object', 'toTile should return an object');
        assert(typeof tile.x === 'number', 'tile should have numeric x property');
        assert(typeof tile.y === 'number', 'tile should have numeric y property');
        assert(tile.x >= 0, 'tile x should be non-negative');
        assert(tile.y >= 0, 'tile y should be non-negative');
        
        done();
    });

    })