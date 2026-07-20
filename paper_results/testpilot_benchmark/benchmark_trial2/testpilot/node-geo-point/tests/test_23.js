let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toString with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toString();
        assert.strictEqual(typeof result, 'string');
        assert.ok(result.includes('40.7128'));
        assert.ok(result.includes('74.0060') || result.includes('74.006'));
        done();
    });
});