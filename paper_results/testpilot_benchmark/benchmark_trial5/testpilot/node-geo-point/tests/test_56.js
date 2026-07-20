let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON - valid GeoJSON point', function(done) {
        const validPoint = {
            type: 'Point',
            coordinates: [-122.4194, 37.7749]
        };
        
        try {
            const result = geo_point.GeoPoint.fromGeoJSON(validPoint);
            assert(result !== null, 'Should return a valid GeoPoint object');
            done();
        } catch (error) {
            done(error);
        }
    });

    })