let mocha = require('mocha');
let assert = require('assert');
let GeoPoint = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - basic functionality', function(done) {
        // Test converting a coordinate to tile at zoom level 10
        let longitude = 0;
        let latitude = 0;
        let zoom = 10;
        
        // Create a GeoPoint instance and convert to tile
        let point = new GeoPoint(latitude, longitude);
        let tile = point.toTile(zoom);
        
        // At zoom 10, coordinate [0,0] should map to tile [512, 512]
        assert.strictEqual(tile.x, 512);
        assert.strictEqual(tile.y, 512);
        done();
    });
});