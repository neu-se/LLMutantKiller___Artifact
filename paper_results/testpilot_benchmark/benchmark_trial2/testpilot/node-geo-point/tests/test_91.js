let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let array = [51.5074123, -0.1277583];
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        assert.strictEqual(geoPoint.lat, 51.5074123);
        assert.strictEqual(geoPoint.lng, -0.1277583);
        done();
    });
});