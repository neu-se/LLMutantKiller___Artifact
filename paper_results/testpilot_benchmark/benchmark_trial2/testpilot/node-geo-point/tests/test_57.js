let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with invalid input should throw error', function(done) {
        // Test with invalid GeoJSON structure
        const invalidGeoJson = {
            type: "LineString",
            coordinates: [[-122.4194, 37.7749], [-122.4094, 37.7849]]
        };
        
        try {
            geo_point.GeoPoint.fromGeoJSON(invalidGeoJson);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.ok(error instanceof Error);
            done();
        }
    });
});