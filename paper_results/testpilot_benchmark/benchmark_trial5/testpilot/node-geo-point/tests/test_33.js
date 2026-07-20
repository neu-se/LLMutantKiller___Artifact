let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with negative coordinates', function(done) {
        // Test with negative coordinates
        let point3 = new geo_point.GeoPoint(-33.8688, -151.2093);
        let obj3 = point3.toObject();
        
        assert.strictEqual(typeof obj3, 'object');
        
        // Check for common property name variations
        if (obj3.latitude !== undefined && obj3.longitude !== undefined) {
            assert.strictEqual(obj3.latitude, -33.8688);
            assert.strictEqual(obj3.longitude, -151.2093);
        } else if (obj3.lat !== undefined && obj3.lng !== undefined) {
            assert.strictEqual(obj3.lat, -33.8688);
            assert.strictEqual(obj3.lng, -151.2093);
        } else if (obj3.x !== undefined && obj3.y !== undefined) {
            assert.strictEqual(obj3.x, -151.2093);
            assert.strictEqual(obj3.y, -33.8688);
        } else {
            // Fallback: check the actual property names
            let keys = Object.keys(obj3);
            assert.strictEqual(obj3[keys[0]], -33.8688);
            assert.strictEqual(obj3[keys[1]], -151.2093);
        }
        
        done();
    });
});