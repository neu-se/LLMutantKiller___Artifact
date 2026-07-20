let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with extreme coordinates', function(done) {
        // Test with boundary values
        const geoJsonPoint = {
            type: "Point",
            coordinates: [180, 90] // max longitude and latitude
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.lat, 90);
        assert.strictEqual(point.lon, 180);
        done();
    });
});