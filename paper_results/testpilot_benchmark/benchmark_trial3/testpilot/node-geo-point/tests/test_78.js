let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with negative coordinates', function(done) {
        // Test with negative coordinates (southern and western hemispheres)
        let coords = [-33.8688, -151.2093]; // Sydney coordinates
        let point = geo_point.GeoPoint.fromLatLngArray(coords);
        
        assert.strictEqual(point.latitude(), -33.8688);
        assert.strictEqual(point.longitude(), -151.2093);
        done();
    });

    })