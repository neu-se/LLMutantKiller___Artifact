let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toString with zero coordinates', function(done) {
        let point = new geo_point.GeoPoint(0, 0);
        let result = point.toString();
        assert.strictEqual(typeof result, 'string');
        assert.ok(result.includes('0'));
        done();
    });

    })