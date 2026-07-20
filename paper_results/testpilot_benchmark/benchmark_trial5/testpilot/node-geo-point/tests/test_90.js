let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with zero coordinates', function(done) {
        // Test with zero coordinates (equator and prime meridian)
        let coords = [0, 0];
        let point = geo_point.GeoPoint.fromLatLngArray(coords);
        
        assert.strictEqual(point.lat, 0);
        assert.strictEqual(point.lng, 0);
        done();
    });
});