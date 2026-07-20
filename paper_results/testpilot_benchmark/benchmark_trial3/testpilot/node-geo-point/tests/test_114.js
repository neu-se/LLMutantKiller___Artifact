let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with zero coordinates', function(done) {
        // Test with zero longitude and latitude
        let point = geo_point.GeoPoint.fromLngLatArray([0, 0]);
        assert.strictEqual(point.lng, 0);
        assert.strictEqual(point.lat, 0);
        done();
    });
});