let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with extreme coordinates', function(done) {
        // Test with boundary values
        let point4 = new geo_point.GeoPoint(90, 180);
        let obj4 = point4.toObject();
        
        assert.strictEqual(typeof obj4, 'object');
        // Check for common property name variations
        assert.strictEqual(obj4.latitude || obj4.lat, 90);
        assert.strictEqual(obj4.longitude || obj4.lon || obj4.lng, 180);
        
        let point5 = new geo_point.GeoPoint(-90, -180);
        let obj5 = point5.toObject();
        
        assert.strictEqual(typeof obj5, 'object');
        assert.strictEqual(obj5.latitude || obj5.lat, -90);
        assert.strictEqual(obj5.longitude || obj5.lon || obj5.lng, -180);
        
        done();
    });
});