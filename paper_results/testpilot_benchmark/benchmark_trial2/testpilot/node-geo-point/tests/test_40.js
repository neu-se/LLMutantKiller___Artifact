let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLatLngArray', function(done) {
        // Test with positive coordinates
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const result1 = point1.toLatLngArray();
        assert.deepEqual(result1, [51.5, -0.15]);
        
        // Test with negative coordinates
        const point2 = new geo_point.GeoPoint(-34.6037, -58.3816);
        const result2 = point2.toLatLngArray();
        assert.deepEqual(result2, [-34.6037, -58.3816]);
        
        // Test with zero coordinates
        const point3 = new geo_point.GeoPoint(0, 0);
        const result3 = point3.toLatLngArray();
        assert.deepEqual(result3, [0, 0]);
        
        // Test with decimal coordinates
        const point4 = new geo_point.GeoPoint(40.7128, -74.0060);
        const result4 = point4.toLatLngArray();
        assert.deepEqual(result4, [40.7128, -74.0060]);
        
        // Test that the returned array has exactly 2 elements
        const point5 = new geo_point.GeoPoint(90, 180);
        const result5 = point5.toLatLngArray();
        assert.equal(result5.length, 2);
        assert.equal(result5[0], 90);
        assert.equal(result5[1], 180);
        
        done();
    });
});