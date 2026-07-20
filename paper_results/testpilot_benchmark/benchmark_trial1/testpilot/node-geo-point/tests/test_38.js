let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLatLngArray with positive coordinates', function(done) {
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let result = point.toLatLngArray();
        
        assert(Array.isArray(result), 'Result should be an array');
        assert.strictEqual(result.length, 2, 'Array should have exactly 2 elements');
        assert.strictEqual(result[0], 40.7128, 'First element should be latitude');
        assert.strictEqual(result[1], -74.0060, 'Second element should be longitude');
        done();
    });

    })