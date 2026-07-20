let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with positive coordinates', function(done) {
        // Test with positive latitude and longitude
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toObject();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.latitude, 40.7128);
        assert.strictEqual(result.longitude, -74.0060);
        assert.strictEqual(Object.keys(result).length, 2);
        done();
    });

    })