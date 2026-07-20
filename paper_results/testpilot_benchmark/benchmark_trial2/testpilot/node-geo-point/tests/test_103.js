let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with valid coordinates', function(done) {
        // Test with valid longitude and latitude array
        let coords = [-122.4194, 37.7749]; // San Francisco coordinates
        let point = geo_point.GeoPoint.fromLngLatArray(coords);
        
        assert.strictEqual(point.longitude, -122.4194);
        assert.strictEqual(point.latitude, 37.7749);
        done();
    });

    })