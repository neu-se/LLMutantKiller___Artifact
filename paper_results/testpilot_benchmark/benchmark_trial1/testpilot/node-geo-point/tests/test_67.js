let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing', function(done) {
        // Test case 1: Basic bearing calculation from London to Birmingham
        const london = new geo_point.GeoPoint(51.5074, -0.1278);
        const birmingham = new geo_point.GeoPoint(52.4862, -1.8904);
        const bearing1 = london.calculateBearing(birmingham);
        
        // Should be approximately northwest (around 315 degrees)
        assert(bearing1 >= 310 && bearing1 <= 320, `Expected bearing around 315°, got ${bearing1}`);
        
        // Test case 2: Bearing due north
        const point1 = new geo_point.GeoPoint(0, 0);
        const point2 = new geo_point.GeoPoint(1, 0);
        const bearing2 = point1.calculateBearing(point2);
        
        // Should be 0 degrees (due north)
        assert(Math.abs(bearing2) < 1, `Expected bearing close to 0°, got ${bearing2}`);
        
        // Test case 3: Bearing due east
        const point3 = new geo_point.GeoPoint(0, 0);
        const point4 = new geo_point.GeoPoint(0, 1);
        const bearing3 = point3.calculateBearing(point4);
        
        // Should be 90 degrees (due east)
        assert(Math.abs(bearing3 - 90) < 1, `Expected bearing close to 90°, got ${bearing3}`);
        
        // Test case 4: Bearing due south
        const point5 = new geo_point.GeoPoint(1, 0);
        const point6 = new geo_point.GeoPoint(0, 0);
        const bearing4 = point5.calculateBearing(point6);
        
        // Should be 180 degrees (due south)
        assert(Math.abs(bearing4 - 180) < 1, `Expected bearing close to 180°, got ${bearing4}`);
        
        // Test case 5: Bearing due west
        const point7 = new geo_point.GeoPoint(0, 1);
        const point8 = new geo_point.GeoPoint(0, 0);
        const bearing5 = point7.calculateBearing(point8);
        
        // Should be 270 degrees (due west)
        assert(Math.abs(bearing5 - 270) < 1, `Expected bearing close to 270°, got ${bearing5}`);
        
        // Test case 6: Same point (bearing should be 0)
        const samePoint1 = new geo_point.GeoPoint(45.0, -122.0);
        const samePoint2 = new geo_point.GeoPoint(45.0, -122.0);
        const bearing6 = samePoint1.calculateBearing(samePoint2);
        
        // Should be 0 degrees when points are the same
        assert(bearing6 === 0, `Expected bearing 0° for same points, got ${bearing6}`);
        
        // Test case 7: Verify bearing is always between 0 and 360
        const randomPoint1 = new geo_point.GeoPoint(-45.5, 170.2);
        const randomPoint2 = new geo_point.GeoPoint(60.1, -150.8);
        const bearing7 = randomPoint1.calculateBearing(randomPoint2);
        
        assert(bearing7 >= 0 && bearing7 < 360, `Bearing should be between 0 and 360, got ${bearing7}`);
        
        done();
    });
});