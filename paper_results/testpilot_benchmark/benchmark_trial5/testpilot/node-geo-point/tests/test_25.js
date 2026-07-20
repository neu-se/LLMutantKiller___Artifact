let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toGeoJSON with positive coordinates', function(done) {
        // Test with positive latitude and longitude
        let point = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let geoJSON = point.toGeoJSON();
        
        assert.strictEqual(geoJSON.type, 'Point');
        assert.strictEqual(Array.isArray(geoJSON.coordinates), true);
        assert.strictEqual(geoJSON.coordinates.length, 2);
        assert.strictEqual(geoJSON.coordinates[0], -74.0060); // longitude first
        assert.strictEqual(geoJSON.coordinates[1], 40.7128);  // latitude second
        done();
    });

    })