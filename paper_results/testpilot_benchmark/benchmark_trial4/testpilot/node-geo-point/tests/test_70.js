let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDistance - static method', function(done) {
        // Test static method call
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const point2 = new geo_point.GeoPoint(51.6, -0.15);
        const distance = geo_point.GeoPoint.calculateDistance(point1, point2);
        
        // Distance should be a positive number
        assert(typeof distance === 'number');
        assert(distance > 0);
        
        done();
    });

    })