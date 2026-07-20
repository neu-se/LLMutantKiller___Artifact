let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing', function(done) {
        // Test case 1: Basic bearing calculation from London to Birmingham
        const point1 = new geo_point.GeoPoint(51.5074, -0.1278); // London
        const point2 = new geo_point.GeoPoint(52.4862, -1.8904); // Birmingham
        const bearing1 = point1.calculateBearing(point2);
        
        // Should be approximately northwest (around 315 degrees)
        assert(bearing1 >= 300 && bearing1 <= 330, `Expected bearing between 300-330, got ${bearing1}`);
        
        // Test case 2: Due north bearing
        const pointSouth = new geo_point.GeoPoint(0, 0);
        const pointNorth = new geo_point.GeoPoint(1, 0);
        const bearingNorth = pointSouth.calculateBearing(pointNorth);
        
        // Should be close to 0 degrees (due north)
        assert(Math.abs(bearingNorth) < 1 || Math.abs(bearingNorth - 360) < 1, `Expected bearing close to 0, got ${bearingNorth}`);
        
        // Test case 3: Due east bearing
        const pointWest = new geo_point.GeoPoint(0, 0);
        const pointEast = new geo_point.GeoPoint(0, 1);
        const bearingEast = pointWest.calculateBearing(pointEast);
        
        // Should be close to 90 degrees (due east)
        assert(Math.abs(bearingEast - 90) < 1, `Expected bearing close to 90, got ${bearingEast}`);
        
        // Test case 4: Due south bearing
        const pointNorthStart = new geo_point.GeoPoint(1, 0);
        const pointSouthEnd = new geo_point.GeoPoint(0, 0);
        const bearingSouth = pointNorthStart.calculateBearing(pointSouthEnd);
        
        // Should be close to 180 degrees (due south)
        assert(Math.abs(bearingSouth - 180) < 1, `Expected bearing close to 180, got ${bearingSouth}`);
        
        // Test case 5: Due west bearing
        const pointEastStart = new geo_point.GeoPoint(0, 1);
        const pointWestEnd = new geo_point.GeoPoint(0, 0);
        const bearingWest = pointEastStart.calculateBearing(pointWestEnd);
        
        // Should be close to 270 degrees (due west)
        assert(Math.abs(bearingWest - 270) < 1, `Expected bearing close to 270, got ${bearingWest}`);
        
        // Test case 6: Same point (should return 0)
        const samePoint1 = new geo_point.GeoPoint(45.0, -122.0);
        const samePoint2 = new geo_point.GeoPoint(45.0, -122.0);
        const bearingSame = samePoint1.calculateBearing(samePoint2);
        
        // Should be 0 when points are identical
        assert(bearingSame === 0, `Expected bearing 0 for identical points, got ${bearingSame}`);
        
        // Test case 7: Verify bearing is always between 0 and 360
        const randomPoint1 = new geo_point.GeoPoint(-45.5, 170.2);
        const randomPoint2 = new geo_point.GeoPoint(60.1, -150.8);
        const bearingRandom = randomPoint1.calculateBearing(randomPoint2);
        
        assert(bearingRandom >= 0 && bearingRandom < 360, `Expected bearing between 0-360, got ${bearingRandom}`);
        
        done();
    });
});