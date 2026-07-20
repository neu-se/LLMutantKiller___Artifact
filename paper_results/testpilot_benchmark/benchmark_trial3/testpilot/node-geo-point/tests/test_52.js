let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.adjustPrecision', function(done) {
        // Test with default precision (should round to specified decimal places)
        let point1 = new geo_point.GeoPoint(40.123456789, -74.987654321);
        let adjusted1 = point1.adjustPrecision(2);
        assert.strictEqual(adjusted1.latitude, 40.12);
        assert.strictEqual(adjusted1.longitude, -74.99);
        
        // Test with higher precision
        let point2 = new geo_point.GeoPoint(51.123456789, 0.987654321);
        let adjusted2 = point2.adjustPrecision(4);
        assert.strictEqual(adjusted2.latitude, 51.1235);
        assert.strictEqual(adjusted2.longitude, 0.9877);
        
        // Test with zero precision (should round to integers)
        let point3 = new geo_point.GeoPoint(37.7749, -122.4194);
        let adjusted3 = point3.adjustPrecision(0);
        assert.strictEqual(adjusted3.latitude, 38);
        assert.strictEqual(adjusted3.longitude, -122);
        
        // Test with precision 1
        let point4 = new geo_point.GeoPoint(48.8566, 2.3522);
        let adjusted4 = point4.adjustPrecision(1);
        assert.strictEqual(adjusted4.latitude, 48.9);
        assert.strictEqual(adjusted4.longitude, 2.4);
        
        // Test that original point is not modified
        let point5 = new geo_point.GeoPoint(35.6762, 139.6503);
        let originalLat = point5.latitude;
        let originalLng = point5.longitude;
        let adjusted5 = point5.adjustPrecision(1);
        assert.strictEqual(point5.latitude, originalLat);
        assert.strictEqual(point5.longitude, originalLng);
        assert.notStrictEqual(adjusted5, point5); // Should be a new instance
        
        // Test with negative coordinates
        let point6 = new geo_point.GeoPoint(-33.8688, -151.2093);
        let adjusted6 = point6.adjustPrecision(2);
        assert.strictEqual(adjusted6.latitude, -33.87);
        assert.strictEqual(adjusted6.longitude, -151.21);
        
        done();
    });
});