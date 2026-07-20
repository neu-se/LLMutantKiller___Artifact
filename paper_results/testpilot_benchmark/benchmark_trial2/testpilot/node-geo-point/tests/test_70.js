let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDistance - same point', function(done) {
        const point1 = { latitude: 40.7128, longitude: -74.0060 }; // New York
        const point2 = { latitude: 40.7128, longitude: -74.0060 }; // Same point
        
        const distance = geo_point.GeoPoint.calculateDistance(point1, point2);
        
        assert.strictEqual(distance, 0, 'Distance between same points should be 0');
        done();
    });

    })