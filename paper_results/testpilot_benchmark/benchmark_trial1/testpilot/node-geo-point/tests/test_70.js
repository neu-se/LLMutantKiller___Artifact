let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination - basic functionality', function(done) {
        // Test calculating destination from London to a point 100km north
        const startPoint = new geo_point.GeoPoint(51.5074, -0.1278); // London
        const distance = 100000; // 100km in meters
        const bearing = 0; // North
        
        const destination = geo_point.GeoPoint.calculateDestination(startPoint, distance, bearing);
        
        // Should be approximately 1 degree north (roughly 111km per degree)
        assert(destination.latitude > startPoint.latitude, 'Latitude should increase when going north');
        assert(Math.abs(destination.latitude - 52.4074) < 0.1, 'Latitude should be approximately 52.4');
        assert(Math.abs(destination.longitude - startPoint.longitude) < 0.01, 'Longitude should remain roughly the same');
        
        done();
    });

    })