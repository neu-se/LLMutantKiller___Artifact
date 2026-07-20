let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination - basic functionality', function(done) {
        // Create a starting point (London coordinates)
        let startPoint = new geo_point.GeoPoint(51.5074, -0.1278);
        
        // Calculate destination 1000 meters north (bearing 0 degrees)
        let destination = startPoint.calculateDestination(1000, 0);
        
        // Verify the result is a GeoPoint instance
        assert(destination instanceof geo_point.GeoPoint);
        
        // Verify latitude increased (moved north)
        assert(destination.latitude > startPoint.latitude);
        
        // Verify longitude stayed approximately the same (moving due north)
        assert(Math.abs(destination.longitude - startPoint.longitude) < 0.001);
        
        done();
    });

    })