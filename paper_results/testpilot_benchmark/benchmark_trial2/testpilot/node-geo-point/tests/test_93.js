let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with extreme coordinates', function(done) {
        // Test with boundary values
        let array = [90, 180]; // North pole, international date line
        let geoPoint = new geo_point(array[0], array[1]);
        
        assert.strictEqual(geoPoint.lat(), 90);
        assert.strictEqual(geoPoint.lng(), 180);
        done();
    });
});