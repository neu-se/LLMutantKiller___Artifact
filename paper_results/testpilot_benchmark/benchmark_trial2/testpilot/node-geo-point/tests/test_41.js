let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLatLngArray', function(done) {
        // Test case 1: Basic positive coordinates
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const result1 = point1.toLatLngArray();
        assert.deepEqual(result1, [51.5, -0.15]);
        
        // Test case 2: Zero coordinates
        const point2 = new geo_point.GeoPoint(0, 0);
        const result2 = point2.toLatLngArray();
        assert.deepEqual(result2, [0, 0]);
        
        // Test case 3: Negative latitude, positive longitude
        const point3 = new geo_point.GeoPoint(-33.8688, 151.2093);
        const result3 = point3.toLatLngArray();
        assert.deepEqual(result3, [-33.8688, 151.2093]);
        
        // Test case 4: Extreme coordinates
        const point4 = new geo_point.GeoPoint(90, 180);
        const result4 = point4.toLatLngArray();
        assert.deepEqual(result4, [90, 180]);
        
        // Test case 5: Negative coordinates
        const point5 = new geo_point.GeoPoint(-90, -180);
        const result5 = point5.toLatLngArray();
        assert.deepEqual(result5, [-90, -180]);
        
        // Test case 6: Decimal precision
        const point6 = new geo_point.GeoPoint(40.7128, -74.0060);
        const result6 = point6.toLatLngArray();
        assert.deepEqual(result6, [40.7128, -74.0060]);
        
        done();
    });
});