let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination - basic functionality', function(done) {
        // Test basic destination calculation
        let startPoint = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let distance = 1000; // 1000 meters
        let bearing = 90; // Due east
        
        let destination = startPoint.calculateDestination(distance, bearing);
        
        assert(destination instanceof geo_point.GeoPoint, 'Result should be a GeoPoint instance');
        assert(typeof destination.latitude === 'number', 'Latitude should be a number');
        assert(typeof destination.longitude === 'number', 'Longitude should be a number');
        
        // The destination should be east of the starting point
        assert(destination.longitude > startPoint.longitude, 'Longitude should increase when moving east');
        
        done();
    });
    
    })