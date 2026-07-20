let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let lngLatArray = [-74.0060, -40.7128];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Check if the properties exist and use the correct property names
        // The geo-point library might use different property names like latitude/longitude
        assert.strictEqual(geoPoint.latitude || geoPoint.lat, -40.7128);
        assert.strictEqual(geoPoint.longitude || geoPoint.lng, -74.0060);
        done();
    });
    
})