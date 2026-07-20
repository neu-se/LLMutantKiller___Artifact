let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLatLngArray with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toLatLngArray();
        
        assert.strictEqual(Array.isArray(result), true);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0], 40.7128);
        assert.strictEqual(result[1], -74.0060);
        done();
    });

    })