let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let lngLatArray = [2.3522219, 48.856614];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // Use assert.ok with Math.abs for floating point comparison
        assert.ok(Math.abs(geoPoint.lat - 48.856614) < 0.000001, 'Latitude should preserve decimal precision');
        assert.ok(Math.abs(geoPoint.lng - 2.3522219) < 0.000001, 'Longitude should preserve decimal precision');
        done();
    });
});