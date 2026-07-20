let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination', function(done) {
        // Test 1: Moving east from London
        const london = new geo_point.GeoPoint(51.5, -0.15);
        const eastPoint = london.calculateDestination(1000, 90); // 1km east
        
        // Should move east (longitude increases), latitude should remain roughly the same
        assert(eastPoint.longitude > london.longitude, 'Longitude should increase when moving east');
        assert(Math.abs(eastPoint.latitude - london.latitude) < 0.01, 'Latitude should remain roughly the same');
        
        // Test 2: Moving north from London
        const northPoint = london.calculateDestination(1000, 0); // 1km north
        
        // Should move north (latitude increases), longitude should remain roughly the same
        assert(northPoint.latitude > london.latitude, 'Latitude should increase when moving north');
        assert(Math.abs(northPoint.longitude - london.longitude) < 0.01, 'Longitude should remain roughly the same');
        
        // Test 3: Moving south from London
        const southPoint = london.calculateDestination(1000, 180); // 1km south
        
        // Should move south (latitude decreases)
        assert(southPoint.latitude < london.latitude, 'Latitude should decrease when moving south');
        assert(Math.abs(southPoint.longitude - london.longitude) < 0.01, 'Longitude should remain roughly the same');
        
        // Test 4: Moving west from London
        const westPoint = london.calculateDestination(1000, 270); // 1km west
        
        // Should move west (longitude decreases)
        assert(westPoint.longitude < london.longitude, 'Longitude should decrease when moving west');
        assert(Math.abs(westPoint.latitude - london.latitude) < 0.01, 'Latitude should remain roughly the same');
        
        // Test 5: Zero distance should return the same point
        const samePoint = london.calculateDestination(0, 45);
        assert(Math.abs(samePoint.latitude - london.latitude) < 0.0001, 'Zero distance should return same latitude');
        assert(Math.abs(samePoint.longitude - london.longitude) < 0.0001, 'Zero distance should return same longitude');
        
        // Test 6: Test with different starting point (Sydney)
        const sydney = new geo_point.GeoPoint(-33.8688, 151.2093);
        const sydneyNorth = sydney.calculateDestination(5000, 0); // 5km north
        
        assert(sydneyNorth.latitude > sydney.latitude, 'Moving north from Sydney should increase latitude');
        assert(sydneyNorth instanceof geo_point.GeoPoint, 'Result should be a GeoPoint instance');
        
        // Test 7: Verify the result is a proper GeoPoint object
        assert(eastPoint instanceof geo_point.GeoPoint, 'calculateDestination should return a GeoPoint instance');
        assert(typeof eastPoint.latitude === 'number', 'Latitude should be a number');
        assert(typeof eastPoint.longitude === 'number', 'Longitude should be a number');
        
        done();
    });
});