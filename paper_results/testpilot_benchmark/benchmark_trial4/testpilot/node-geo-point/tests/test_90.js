let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let array = [51.5074123, -0.1277583];
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        // Check if the properties exist and use the correct property names
        // Common property names in geo libraries are latitude/longitude or lat/lon
        assert.strictEqual(geoPoint.latitude || geoPoint.lat, 51.5074123);
        assert.strictEqual(geoPoint.longitude || geoPoint.lng || geoPoint.lon, -0.1277583);
        done();
    });
});