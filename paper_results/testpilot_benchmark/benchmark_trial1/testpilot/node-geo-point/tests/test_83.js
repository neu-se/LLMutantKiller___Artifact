let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with valid coordinates', function(done) {
        // Test with valid latitude and longitude array
        let coords = [40.7128, -74.0060]; // New York City coordinates
        let point = geo_point.GeoPoint.fromLatLngArray(coords);
        
        assert.strictEqual(point.lat, 40.7128);
        assert.strictEqual(point.lng, -74.0060);
        done();
    });
});