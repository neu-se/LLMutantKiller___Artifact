let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromObject with valid latitude and longitude', function(done) {
        let obj = { latitude: 40.7128, longitude: -74.0060 };
        let point = geo_point.GeoPoint.fromObject(obj);
        
        assert.strictEqual(point.latitude, 40.7128);
        assert.strictEqual(point.longitude, -74.0060);
        done();
    });

    })