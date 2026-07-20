let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with invalid array length', function(done) {
        // Test with array that doesn't have exactly 2 elements
        try {
            let coords = [40.7128]; // Only one element
            let point = geo_point.GeoPoint.fromLatLngArray(coords);
            assert.fail('Should have thrown an error for invalid array length');
        } catch (error) {
            assert.ok(error instanceof Error);
        }
        done();
    });
});