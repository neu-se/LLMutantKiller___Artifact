let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with typical longitude/latitude values
        let lngLatArray = [-122.4194, 37.7749]; // San Francisco coordinates
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Check the actual property names and values
        assert.strictEqual(geoPoint.latitude, 37.7749, 'Latitude should be correctly assigned');
        assert.strictEqual(geoPoint.longitude, -122.4194, 'Longitude should be correctly assigned');
        done();
    });
});