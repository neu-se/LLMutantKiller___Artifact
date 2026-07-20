let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateBearing', function(done) {
        // Test bearing calculation between two points
        
        // Test 1: Bearing from point A to point B (north direction)
        let pointA = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        let pointB = new geo_point.GeoPoint(1, 0); // 1 degree north
        let bearing1 = pointA.calculateBearing(pointB);
        assert(typeof bearing1 === 'number', 'Bearing should be a number');
        assert(bearing1 >= 0 && bearing1 < 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 2: Bearing from point to itself should be 0 or handle gracefully
        let pointC = new geo_point.GeoPoint(45.0, -122.0);
        let bearing2 = pointC.calculateBearing(pointC);
        assert(typeof bearing2 === 'number', 'Bearing to same point should return a number');
        
        // Test 3: Bearing calculation with different coordinates
        let pointD = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let pointE = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        let bearing3 = pointD.calculateBearing(pointE);
        assert(typeof bearing3 === 'number', 'Bearing should be a number');
        assert(bearing3 >= 0 && bearing3 < 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 4: Bearing with negative coordinates
        let pointF = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        let pointG = new geo_point.GeoPoint(51.5074, -0.1278); // London
        let bearing4 = pointF.calculateBearing(pointG);
        assert(typeof bearing4 === 'number', 'Bearing should be a number');
        assert(bearing4 >= 0 && bearing4 < 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 5: Verify that the method exists and is callable
        assert(typeof pointA.calculateBearing === 'function', 'calculateBearing should be a function');
        
        done();
    });
});