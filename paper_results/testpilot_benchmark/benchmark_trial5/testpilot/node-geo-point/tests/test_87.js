let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with valid coordinates', function(done) {
        // Test with typical latitude and longitude values
        let array = [40.7128, -74.0060]; // New York City coordinates
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        // Use the correct property names - likely 'latitude' and 'longitude' instead of 'lat' and 'lng'
        assert.strictEqual(geoPoint.latitude, 40.7128);
        assert.strictEqual(geoPoint.longitude, -74.0060);
        done();
    });
});