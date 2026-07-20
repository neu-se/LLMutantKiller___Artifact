let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromLngLatArray with zero coordinates', function(done) {
        // Test with zero values
        let lngLatArray = [0, 0];
        let geoPoint = geo_point.GeoPoint.fromLngLatArray(lngLatArray);
        
        assert.strictEqual(geoPoint.lat, 0);
        assert.strictEqual(geoPoint.lng, 0);
        done();
    });
    
    })