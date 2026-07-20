let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('should create GeoPoint with latitude and longitude', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        done();
    });

    })