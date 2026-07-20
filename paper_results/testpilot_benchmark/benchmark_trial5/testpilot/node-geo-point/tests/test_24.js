let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toGeoJSON with valid coordinates', function(done) {
        // Test with basic latitude and longitude
        let point = new geo_point.GeoPoint(40.7128, -74.0060);
        let geoJSON = point.toGeoJSON();
        
        assert.strictEqual(geoJSON.type, 'Point');
        assert.strictEqual(geoJSON.coordinates.length, 2);
        assert.strictEqual(geoJSON.coordinates[0], -74.0060); // longitude first in GeoJSON
        assert.strictEqual(geoJSON.coordinates[1], 40.7128);  // latitude second in GeoJSON
        done();
    });

    })