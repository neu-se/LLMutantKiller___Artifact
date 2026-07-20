let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLngLatArray with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let result = point.toLngLatArray();
        
        assert.strictEqual(Array.isArray(result), true, 'Result should be an array');
        assert.strictEqual(result.length, 2, 'Array should have exactly 2 elements');
        assert.strictEqual(result[0], -74.0060, 'First element should be longitude');
        assert.strictEqual(result[1], 40.7128, 'Second element should be latitude');
        done();
    });

    })