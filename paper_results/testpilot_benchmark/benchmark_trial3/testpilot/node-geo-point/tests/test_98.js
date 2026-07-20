let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with negative coordinates', function(done) {
        // Test with negative longitude and latitude values
        let point = geo_point.GeoPoint.fromLngLatArray([-74.006, -40.7128]);
        assert.strictEqual(point.longitude(), -74.006);
        assert.strictEqual(point.latitude(), -40.7128);
        done();
    });

    })