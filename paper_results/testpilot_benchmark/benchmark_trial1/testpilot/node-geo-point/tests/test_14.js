let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateBearing', function(done) {
        // Test case 1: Basic bearing calculation from London to Birmingham
        const startPoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint1 = new geo_point.GeoPoint(52.5, -1.15);
        const bearing1 = startPoint1.calculateBearing(endPoint1);
        
        // Bearing should be a number between 0 and 360
        assert(typeof bearing1 === 'number', 'Bearing should be a number');
        assert(bearing1 >= 0 && bearing1 <= 360, 'Bearing should be between 0 and 360 degrees');
        
        // Test case 2: Bearing from same point to itself should be 0 or undefined
        const samePoint = new geo_point.GeoPoint(51.5, -0.15);
        const bearingToSelf = samePoint.calculateBearing(samePoint);
        assert(bearingToSelf === 0 || bearingToSelf === undefined || isNaN(bearingToSelf), 
               'Bearing to same point should be 0, undefined, or NaN');
        
        // Test case 3: Bearing due north (approximately)
        const southPoint = new geo_point.GeoPoint(50.0, 0.0);
        const northPoint = new geo_point.GeoPoint(51.0, 0.0);
        const northBearing = southPoint.calculateBearing(northPoint);
        
        // Should be close to 0 degrees (due north)
        assert(Math.abs(northBearing) < 10 || Math.abs(northBearing - 360) < 10, 
               'Bearing due north should be close to 0 or 360 degrees');
        
        // Test case 4: Bearing due east (approximately)
        const westPoint = new geo_point.GeoPoint(51.0, -1.0);
        const eastPoint = new geo_point.GeoPoint(51.0, 1.0);
        const eastBearing = westPoint.calculateBearing(eastPoint);
        
        // Should be close to 90 degrees (due east)
        assert(Math.abs(eastBearing - 90) < 10, 
               'Bearing due east should be close to 90 degrees');
        
        // Test case 5: Test with negative coordinates
        const negativeStart = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const negativeEnd = new geo_point.GeoPoint(-37.8136, 144.9631);   // Melbourne
        const negativeBearing = negativeStart.calculateBearing(negativeEnd);
        
        assert(typeof negativeBearing === 'number', 'Bearing with negative coordinates should be a number');
        assert(negativeBearing >= 0 && negativeBearing <= 360, 
               'Bearing with negative coordinates should be between 0 and 360 degrees');
        
        done();
    });
});