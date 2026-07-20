let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLatLngArray with minimum boundary values', function(done) {
        // Test with minimum boundary latitude and longitude values
        let coords = [-90, -180]; // Minimum valid values
        let point = geo_point.GeoPoint.fromLatLngArray(coords);
        
        assert.strictEqual(point.latitude(), -90);
        assert.strictEqual(point.longitude(), -180);
        done();
    });

    })