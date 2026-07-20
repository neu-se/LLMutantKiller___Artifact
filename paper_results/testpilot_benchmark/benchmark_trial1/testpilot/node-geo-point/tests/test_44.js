let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLngLatArray', function(done) {
        // Test case 1: Basic functionality with positive latitude and negative longitude
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const result1 = point1.toLngLatArray();
        assert.deepEqual(result1, [-0.15, 51.5]);
        
        // Test case 2: Both positive coordinates
        const point2 = new geo_point.GeoPoint(40.7128, 74.0060);
        const result2 = point2.toLngLatArray();
        assert.deepEqual(result2, [74.0060, 40.7128]);
        
        // Test case 3: Both negative coordinates
        const point3 = new geo_point.GeoPoint(-33.8688, -151.2093);
        const result3 = point3.toLngLatArray();
        assert.deepEqual(result3, [-151.2093, -33.8688]);
        
        // Test case 4: Zero coordinates
        const point4 = new geo_point.GeoPoint(0, 0);
        const result4 = point4.toLngLatArray();
        assert.deepEqual(result4, [0, 0]);
        
        // Test case 5: Verify array length is always 2
        const point5 = new geo_point.GeoPoint(12.34, 56.78);
        const result5 = point5.toLngLatArray();
        assert.equal(result5.length, 2);
        assert.equal(result5[0], 56.78); // longitude first
        assert.equal(result5[1], 12.34); // latitude second
        
        done();
    });
});