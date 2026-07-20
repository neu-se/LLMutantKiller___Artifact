let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateBearing', function(done) {
        // Test 1: Basic bearing calculation between two points
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = new geo_point.GeoPoint(52.5, -1.15);
        const bearing1 = startPoint1.calculateBearing(endPoint1);
        
        // Verify that bearing is a number and within valid range (0-360 degrees)
        assert(typeof bearing1 === 'number', 'Bearing should be a number');
        assert(bearing1 >= 0 && bearing1 <= 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 2: Bearing from same point to itself should be 0 or handle gracefully
        const samePoint = new geo_point.GeoPoint(40.0, -74.0);
        const bearingToSelf = samePoint.calculateBearing(samePoint);
        assert(typeof bearingToSelf === 'number', 'Bearing to self should be a number');
        
        // Test 3: Different coordinates
        const startPoint2 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const endPoint2 = new geo_point.GeoPoint(34.0522, -118.2437); // Los Angeles
        const bearing2 = startPoint2.calculateBearing(endPoint2);
        
        assert(typeof bearing2 === 'number', 'Bearing should be a number');
        assert(bearing2 >= 0 && bearing2 <= 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 4: Verify that different point pairs produce different bearings
        assert(bearing1 !== bearing2, 'Different point pairs should produce different bearings');
        
        // Test 5: Test with negative coordinates
        const startPoint3 = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const endPoint3 = new geo_point.GeoPoint(-37.8136, 144.9631); // Melbourne
        const bearing3 = startPoint3.calculateBearing(endPoint3);
        
        assert(typeof bearing3 === 'number', 'Bearing should be a number');
        assert(bearing3 >= 0 && bearing3 <= 360, 'Bearing should be between 0 and 360 degrees');
        
        done();
    });
});