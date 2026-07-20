let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with zero coordinates', function(done) {
        // Test with zero values
        let lngLatArray = [0, 0];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        // The geo-point library likely uses different property names
        // Common alternatives are latitude/longitude or different accessor methods
        assert.strictEqual(geoPoint.latitude, 0);
        assert.strictEqual(geoPoint.longitude, 0);
        done();
    });
});