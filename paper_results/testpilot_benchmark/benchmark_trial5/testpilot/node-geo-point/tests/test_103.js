let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with extreme coordinates', function(done) {
        // Test with boundary values
        let lngLatArray = [180, 90]; // Maximum longitude and latitude
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Check the actual property names and values
        assert.strictEqual(geoPoint.latitude, 90, 'Latitude should be 90');
        assert.strictEqual(geoPoint.longitude, 180, 'Longitude should be 180');
        done();
    });
});