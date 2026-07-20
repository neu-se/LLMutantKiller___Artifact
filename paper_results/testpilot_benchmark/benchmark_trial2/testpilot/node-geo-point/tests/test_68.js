let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromObject with valid coordinates', function(done) {
        const point = geo_point.GeoPoint.fromObject({ latitude: 51.5, longitude: -0.15 });
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        done();
    });

    })