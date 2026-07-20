let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination', function(done) {
        // Test 1: Moving east from London
        const london = new geo_point.GeoPoint(51.5, -0.15);
        const eastPoint = london.calculateDestination(1000, 90); // 1km east
        
        // Should move east (longitude increases), latitude should remain roughly the same
        assert(eastPoint.longitude > london.longitude, 'Moving east should increase longitude');
        assert(Math.abs(eastPoint.latitude - london.latitude) < 0.01, 'Latitude should remain roughly the same when moving east');
        
        // Test 2: Moving north from London
        const northPoint = london.calculateDestination(1000, 0); // 1km north
        
        // Should move north (latitude increases), longitude should remain roughly the same
        assert(northPoint.latitude > london.latitude, 'Moving north should increase latitude');
        assert(Math.abs(northPoint.longitude - london.longitude) < 0.01, 'Longitude should remain roughly the same when moving north');
        
        // Test 3: Moving south from London
        const southPoint = london.calculateDestination(1000, 180); // 1km south
        
        // Should move south (latitude decreases)
        assert(southPoint.latitude < london.latitude, 'Moving south should decrease latitude');
        assert(Math.abs(southPoint.longitude - london.longitude) < 0.01, 'Longitude should remain roughly the same when moving south');
        
        // Test 4: Moving west from London
        const westPoint = london.calculateDestination(1000, 270); // 1km west
        
        // Should move west (longitude decreases)
        assert(westPoint.longitude < london.longitude, 'Moving west should decrease longitude');
        assert(Math.abs(westPoint.latitude - london.latitude) < 0.01, 'Latitude should remain roughly the same when moving west');
        
        // Test 5: Zero distance should return the same point
        const samePoint = london.calculateDestination(0, 45);
        assert(Math.abs(samePoint.latitude - london.latitude) < 0.0001, 'Zero distance should return same latitude');
        assert(Math.abs(samePoint.longitude - london.longitude) < 0.0001, 'Zero distance should return same longitude');
        
        // Test 6: Test with different starting point (equator)
        const equatorPoint = new geo_point.GeoPoint(0, 0);
        const northFromEquator = equatorPoint.calculateDestination(1000, 0);
        assert(northFromEquator.latitude > 0, 'Moving north from equator should give positive latitude');
        assert(Math.abs(northFromEquator.longitude) < 0.01, 'Longitude should remain close to 0 when moving north from equator');
        
        done();
    });
});