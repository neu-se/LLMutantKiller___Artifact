let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with valid point', function(done) {
        // Test with a valid GeoJSON point
        const geoJsonPoint = {
            type: "Point",
            coordinates: [-122.4194, 37.7749] // longitude, latitude (San Francisco)
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.latitude, 37.7749);
        assert.strictEqual(point.longitude, -122.4194);
        done();
    });

    })