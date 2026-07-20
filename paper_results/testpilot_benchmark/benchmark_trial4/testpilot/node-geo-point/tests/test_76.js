let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination - basic northward movement', function(done) {
        // Test moving 1km north from equator
        let startPoint = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        let destination = startPoint.calculateDestination(1000, 0); // 1km north (bearing 0°)
        
        assert(destination.latitude > 0, 'Latitude should increase when moving north');
        assert(Math.abs(destination.longitude - 0) < 0.001, 'Longitude should remain approximately the same');
        assert(Math.abs(destination.latitude - 0.008993) < 0.001, 'Latitude should be approximately 0.009°');
        done();
    });

    })