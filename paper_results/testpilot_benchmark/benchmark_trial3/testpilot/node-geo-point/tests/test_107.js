let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with extreme coordinates', function(done) {
        // Test with boundary values
        let lngLatArray = [180, 90]; // Maximum longitude and latitude
        let geoPoint = new geo_point(90, 180); // lat, lng constructor
        
        assert.strictEqual(geoPoint.lat(), 90);
        assert.strictEqual(geoPoint.lng(), 180);
        done();
    });
});