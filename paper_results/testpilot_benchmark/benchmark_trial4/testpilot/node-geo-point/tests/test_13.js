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
        const point1 = new geo_point.GeoPoint(0, 0); // Equator, Prime Meridian
        const point2 = new geo_point.GeoPoint(1, 0); // 1 degree north
        const bearingNorth = point1.calculateBearing(point2);
        assert(typeof bearingNorth === 'number', 'Bearing should be a number');
        
        // Test 4: Negative coordinates
        const negPoint1 = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const negPoint2 = new geo_point.GeoPoint(-37.8136, 144.9631); // Melbourne
        const bearingNegative = negPoint1.calculateBearing(negPoint2);
        assert(typeof bearingNegative === 'number', 'Bearing with negative coordinates should be a number');
        assert(bearingNegative >= 0 && bearingNegative <= 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test 5: Cross-hemisphere calculation
        const northPoint = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const southPoint = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const crossHemisphereBearing = northPoint.calculateBearing(southPoint);
        assert(typeof crossHemisphereBearing === 'number', 'Cross-hemisphere bearing should be a number');
        assert(crossHemisphereBearing >= 0 && crossHemisphereBearing <= 360, 'Bearing should be between 0 and 360 degrees');
        
        done();
    });
});