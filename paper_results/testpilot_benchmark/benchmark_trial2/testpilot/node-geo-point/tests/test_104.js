let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with typical longitude/latitude values
        let lngLatArray = [-122.4194, 37.7749]; // San Francisco coordinates
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 37.7749, 'Latitude should match array[1]');
        assert.strictEqual(geoPoint.lng, -122.4194, 'Longitude should match array[0]');
        done();
    });

    })