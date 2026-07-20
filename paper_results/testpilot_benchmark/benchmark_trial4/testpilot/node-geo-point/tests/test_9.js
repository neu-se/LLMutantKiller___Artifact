let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
        // Test 1: Moving east from London
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = startPoint1.calculateDestination(1000, 90);
        
        // Should move east (increase longitude) while latitude stays roughly the same
        assert(endPoint1.longitude > startPoint1.longitude, 'Longitude should increase when moving east');
        assert(Math.abs(endPoint1.latitude - startPoint1.latitude) < 0.1, 'Latitude should remain roughly the same when moving east');
        
        // Test 2: Moving north from the same point
        const endPoint2 = startPoint1.calculateDestination(1000, 0);
        
        // Should move north (increase latitude) while longitude stays roughly the same
        assert(endPoint2.latitude > startPoint1.latitude, 'Latitude should increase when moving north');
        assert(Math.abs(endPoint2.longitude - startPoint1.longitude) < 0.1, 'Longitude should remain roughly the same when moving north');
        
        // Test 3: Moving south
        const endPoint3 = startPoint1.calculateDestination(1000, 180);
        
        // Should move south (decrease latitude)
        assert(endPoint3.latitude < startPoint1.latitude, 'Latitude should decrease when moving south');
        
        // Test 4: Moving west
        const endPoint4 = startPoint1.calculateDestination(1000, 270);
        
        // Should move west (decrease longitude)
        assert(endPoint4.longitude < startPoint1.longitude, 'Longitude should decrease when moving west');
        
        // Test 5: Zero distance should return the same point
        const endPoint5 = startPoint1.calculateDestination(0, 90);
        assert.equal(endPoint5.latitude, startPoint1.latitude, 'Zero distance should return same latitude');
        assert.equal(endPoint5.longitude, startPoint1.longitude, 'Zero distance should return same longitude');
        
        // Test 6: Test with different starting point
        const startPoint2 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const endPoint6 = startPoint2.calculateDestination(5000, 45); // Northeast
        
        // Should move northeast (increase both lat and lon)
        assert(endPoint6.latitude > startPoint2.latitude, 'Should move north');
        assert(endPoint6.longitude > startPoint2.longitude, 'Should move east');
        
        done();
    });
});