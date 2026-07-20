let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination - eastward movement', function(done) {
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = startPoint.calculateDestination(1000, 90); // 1km east
        
        // Should move eastward (longitude increases)
        assert(endPoint.longitude > startPoint.longitude, 'Longitude should increase when moving east');
        // Latitude should remain approximately the same
        assert(Math.abs(endPoint.latitude - startPoint.latitude) < 0.01, 'Latitude should remain approximately the same');
        // Should be approximately 1km away
        const distance = startPoint.calculateDistance(endPoint);
        assert(Math.abs(distance - 1000) < 10, 'Distance should be approximately 1000m');
        
        done();
    });

    })