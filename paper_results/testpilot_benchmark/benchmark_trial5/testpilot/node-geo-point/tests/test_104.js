let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let lngLatArray = [-74.006, -40.7128];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // The array is [lng, lat] but the method might be interpreting it as [lat, lng]
        assert.strictEqual(geoPoint.lat, -74.006, 'Latitude should be correctly assigned');
        assert.strictEqual(geoPoint.lng, -40.7128, 'Longitude should be correctly assigned');
        done();
    });
});