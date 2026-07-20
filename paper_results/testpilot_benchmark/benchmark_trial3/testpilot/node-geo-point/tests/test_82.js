let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with zero coordinates', function(done) {
        // Test with zero values
        let array = [0, 0];
        let geoPoint = geo_point.GeoPoint.fromLatLngArray(array);
        
        assert.strictEqual(geoPoint.lat, 0);
        assert.strictEqual(geoPoint.lng, 0);
        done();
    });

    })