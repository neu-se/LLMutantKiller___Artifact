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
        
        // Test case 2: Bearing due north (should be close to 0 or 360)
        const startPoint2 = new geo_point.GeoPoint(0, 0);
        const endPoint2 = new geo_point.GeoPoint(1, 0);
        const bearing2 = startPoint2.calculateBearing(endPoint2);
        
        assert(typeof bearing2 === 'number', 'Bearing should be a number');
        assert(Math.abs(bearing2) < 1 || Math.abs(bearing2 - 360) < 1, 'Bearing due north should be close to 0 or 360');
        
        // Test case 3: Bearing due east (should be close to 90)
        const startPoint3 = new geo_point.GeoPoint(0, 0);
        const endPoint3 = new geo_point.GeoPoint(0, 1);
        const bearing3 = startPoint3.calculateBearing(endPoint3);
        
        assert(typeof bearing3 === 'number', 'Bearing should be a number');
        assert(Math.abs(bearing3 - 90) < 1, 'Bearing due east should be close to 90 degrees');
        
        // Test case 4: Same point (bearing should be defined)
        const startPoint4 = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint4 = new geo_point.GeoPoint(51.5, -0.15);
        const bearing4 = startPoint4.calculateBearing(endPoint4);
        
        assert(typeof bearing4 === 'number', 'Bearing should be a number even for same points');
        
        done();
    });
});