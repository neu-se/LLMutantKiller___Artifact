let mocha = require('mocha');
let assert = require('assert');
let GeoPoint = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - different zoom levels', function(done) {
        let coordinate = [0, 0];
        
        // Create a GeoPoint instance first
        let geoPoint = new GeoPoint(coordinate[0], coordinate[1]);
        
        // Test zoom level 0 - should be [0, 0]
        let tile0 = geoPoint.toTile(0);
        assert.strictEqual(tile0[0], 0);
        assert.strictEqual(tile0[1], 0);
        
        // Test zoom level 1 - should be [1, 1]
        let tile1 = geoPoint.toTile(1);
        assert.strictEqual(tile1[0], 1);
        assert.strictEqual(tile1[1], 1);
        
        done();
    });
});