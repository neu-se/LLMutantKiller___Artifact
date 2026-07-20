let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let point = geo_point.GeoPoint.fromLngLatArray([123.456789, 45.678901]);
        assert.strictEqual(point.lng, 123.456789);
        assert.strictEqual(point.lat, 45.678901);
        done();
    });
});