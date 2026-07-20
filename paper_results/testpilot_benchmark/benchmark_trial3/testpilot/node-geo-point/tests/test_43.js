let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLngLatArray with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toLngLatArray();
        assert.strictEqual(Array.isArray(result), true);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0], -74.0060); // longitude first
        assert.strictEqual(result[1], 40.7128);  // latitude second
        done();
    });

    })