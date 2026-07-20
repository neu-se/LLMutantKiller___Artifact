let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromObject with valid object', function(done) {
        const validObject = { latitude: 40.7128, longitude: -74.0060 };
        const geoPoint = geo_point.GeoPoint.fromObject(validObject);
        
        assert.strictEqual(geoPoint.latitude, 40.7128);
        assert.strictEqual(geoPoint.longitude, -74.0060);
        done();
    });

    })