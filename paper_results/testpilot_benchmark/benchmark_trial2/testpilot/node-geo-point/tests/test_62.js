let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with negative coordinates', function(done) {
        // Test with negative coordinates
        const geoJsonPoint = {
            type: "Point",
            coordinates: [-74.006, -40.7128] // negative longitude and latitude
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        // Use the correct property names for geo-point library
        assert.strictEqual(point.lat, -40.7128);
        assert.strictEqual(point.lon, -74.006);
        done();
    });
});