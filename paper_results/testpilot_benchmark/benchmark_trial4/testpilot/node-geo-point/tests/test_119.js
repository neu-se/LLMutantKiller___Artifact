let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with valid longitude and latitude values
        let point = geo_point.GeoPoint.fromLngLatArray([-122.4194, 37.7749]);
        assert.strictEqual(point.lng, -122.4194);
        assert.strictEqual(point.lat, 37.7749);
        done();
    });
});