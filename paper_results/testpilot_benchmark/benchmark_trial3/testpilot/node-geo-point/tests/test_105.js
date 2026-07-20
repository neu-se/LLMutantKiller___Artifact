let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with decimal precision', function(done) {
        // Test with high precision decimal values
        let lngLatArray = [2.3522219, 48.856614];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 48.856614);
        assert.strictEqual(geoPoint.lng, 2.3522219);
        done();
    });
});