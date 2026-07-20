let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
        // Test 1: Moving east from London
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = startPoint1.calculateDestination(1000, 90);
        
        // Should move east (increase longitude) and stay roughly at same latitude
        assert(endPoint1.latitude !== undefined, 'End point should have latitude');
        assert(endPoint1.longitude !== undefined, 'End point should have longitude');
        assert(endPoint1.longitude > startPoint1.longitude, 'Moving east should increase longitude');
        assert(Math.abs(endPoint1.latitude - startPoint1.latitude) < 0.1, 'Latitude should not change much when moving east');
        
        // Test 2: Moving north
        const startPoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint2 = startPoint2.calculateDestination(1000, 0);
        
        // Should move north (increase latitude) and stay roughly at same longitude
        assert(endPoint2.latitude > startPoint2.latitude, 'Moving north should increase latitude');
        assert(Math.abs(endPoint2.longitude - startPoint2.longitude) < 0.1, 'Longitude should not change much when moving north');
        
        // Test 3: Zero distance should return same point
        const startPoint3 = new geo_point.GeoPoint(40.7128, -74.0060);
        const endPoint3 = startPoint3.calculateDestination(0, 45);
        
        assert(Math.abs(endPoint3.latitude - startPoint3.latitude) < 1e-10, 'Zero distance should not change latitude');
        assert(Math.abs(endPoint3.longitude - startPoint3.longitude) < 1e-10, 'Zero distance should not change longitude');
        
        // Test 4: Moving south
        const startPoint4 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint4 = startPoint4.calculateDestination(1000, 180);
        
        // Should move south (decrease latitude)
        assert(endPoint4.latitude < startPoint4.latitude, 'Moving south should decrease latitude');
        
        // Test 5: Moving west
        const startPoint5 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint5 = startPoint5.calculateDestination(1000, 270);
        
        // Should move west (decrease longitude)
        assert(endPoint5.longitude < startPoint5.longitude, 'Moving west should decrease longitude');
        
        done();
    });
});