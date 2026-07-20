let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with valid coordinates', function(done) {
        // Test with positive coordinates
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060);
        let obj1 = point1.toObject();
        
        assert.strictEqual(typeof obj1, 'object');
        
        // Check the actual property names - they might be 'latitude'/'longitude' instead of 'lat'/'lon'
        assert.strictEqual(obj1.latitude, 40.7128);
        assert.strictEqual(obj1.longitude, -74.0060);
        
        done();
    });
});