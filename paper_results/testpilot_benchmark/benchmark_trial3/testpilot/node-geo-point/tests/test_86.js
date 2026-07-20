let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let array = [51.5074123, -0.1277583];
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        // Check if the properties exist and use the correct property names
        // Common alternatives are latitude/longitude or _lat/_lng
        assert.strictEqual(geoPoint.latitude || geoPoint._lat || geoPoint.lat, 51.5074123);
        assert.strictEqual(geoPoint.longitude || geoPoint._lng || geoPoint.lng, -0.1277583);
        done();
    });
});