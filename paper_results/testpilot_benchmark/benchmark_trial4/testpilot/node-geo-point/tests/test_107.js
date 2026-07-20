let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with negative coordinates', function(done) {
        // Test with negative longitude and latitude
        let lngLatArray = [-74.006, -40.7128];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, -40.7128, 'Latitude should be correctly assigned');
        assert.strictEqual(geoPoint.lng, -74.006, 'Longitude should be correctly assigned');
        done();
    });

    })