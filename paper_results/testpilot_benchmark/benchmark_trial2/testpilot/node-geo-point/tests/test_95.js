let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with zero coordinates', function(done) {
        // Test with zero values
        let array = [0, 0];
        let geoPoint = new geo_point(array[0], array[1]);
        
        assert.strictEqual(geoPoint.latitude(), 0);
        assert.strictEqual(geoPoint.longitude(), 0);
        done();
    });
});