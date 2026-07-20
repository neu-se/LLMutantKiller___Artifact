let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with boundary values', function(done) {
        // Test with longitude and latitude boundary values
        let point = geo_point.GeoPoint.fromLngLatArray([180, 90]);
        assert.strictEqual(point.lng, 180);
        assert.strictEqual(point.lat, 90);
        done();
    });
});