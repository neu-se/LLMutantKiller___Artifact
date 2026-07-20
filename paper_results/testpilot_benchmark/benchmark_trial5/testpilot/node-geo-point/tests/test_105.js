let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with zero coordinates', function(done) {
        // Test with zero values
        let lngLatArray = [0, 0];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // The array format is [longitude, latitude]
        // So index 0 is longitude, index 1 is latitude
        assert.strictEqual(geoPoint.latitude, 0, 'Latitude should be 0');
        assert.strictEqual(geoPoint.longitude, 0, 'Longitude should be 0');
        done();
    });
});