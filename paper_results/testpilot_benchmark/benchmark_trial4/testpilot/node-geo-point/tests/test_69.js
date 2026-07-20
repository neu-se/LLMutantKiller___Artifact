let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDistance', function(done) {
        // Test 1: Distance between two different points
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const point2 = new geo_point.GeoPoint(52.5, -1.15);
        const distance1 = geo_point.GeoPoint.calculateDistance(point1, point2);
        
        // Should return a positive distance in meters
        assert(distance1 > 0, 'Distance should be positive');
        assert(typeof distance1 === 'number', 'Distance should be a number');
        
        // Test 2: Distance between same points should be 0
        const samePoint1 = new geo_point.GeoPoint(51.5, -0.15);
        const samePoint2 = new geo_point.GeoPoint(51.5, -0.15);
        const distance2 = geo_point.GeoPoint.calculateDistance(samePoint1, samePoint2);
        
        assert(Math.abs(distance2) < 0.001, 'Distance between same points should be approximately 0');
        
        // Test 3: Distance should be symmetric (distance A to B = distance B to A)
        const pointA = new geo_point.GeoPoint(51.5, -0.15);
        const pointB = new geo_point.GeoPoint(51.6, -0.15);
        const distanceAB = geo_point.GeoPoint.calculateDistance(pointA, pointB);
        const distanceBA = geo_point.GeoPoint.calculateDistance(pointB, pointA);
        
        assert(Math.abs(distanceAB - distanceBA) < 0.001, 'Distance should be symmetric');
        
        // Test 4: Small distance test (approximately 0.1 degree latitude difference)
        const point3 = new geo_point.GeoPoint(51.5, -0.15);
        const point4 = new geo_point.GeoPoint(51.6, -0.15);
        const distance3 = geo_point.GeoPoint.calculateDistance(point3, point4);
        
        // 0.1 degree latitude is approximately 11 km
        assert(distance3 > 10000 && distance3 < 12000, 'Distance should be approximately 11km for 0.1 degree latitude difference');
        
        // Test 5: Test with negative coordinates
        const point5 = new geo_point.GeoPoint(-33.8688, 151.2093); // Sydney
        const point6 = new geo_point.GeoPoint(-37.8136, 144.9631); // Melbourne
        const distance4 = geo_point.GeoPoint.calculateDistance(point5, point6);
        
        assert(distance4 > 0, 'Distance between Sydney and Melbourne should be positive');
        assert(distance4 > 700000, 'Distance between Sydney and Melbourne should be over 700km');
        
        done();
    });
});