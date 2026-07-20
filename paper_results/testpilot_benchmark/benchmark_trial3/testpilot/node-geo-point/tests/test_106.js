let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let lngLatArray = [2.3522219, 48.856614];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Use the correct property names - likely 'latitude' and 'longitude' instead of 'lat' and 'lng'
        assert.strictEqual(geoPoint.latitude, 48.856614);
        assert.strictEqual(geoPoint.longitude, 2.3522219);
        done();
    });
});