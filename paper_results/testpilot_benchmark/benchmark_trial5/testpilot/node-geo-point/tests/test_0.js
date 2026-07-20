let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('should create a GeoPoint with valid coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        assert.strictEqual(point.latitude, 40.7128);
        assert.strictEqual(point.longitude, -74.0060);
        done();
    });

    })