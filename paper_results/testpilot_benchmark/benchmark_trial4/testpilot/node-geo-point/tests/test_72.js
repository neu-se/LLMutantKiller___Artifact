let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing', function(done) {
        // Test 1: Bearing from point to itself should be 0
        const point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const bearing1 = geo_point.GeoPoint.calculateBearing(point1, point1);
        assert.strictEqual(bearing1, 0, 'Bearing from point to itself should be 0');

        // Test 2: Bearing due north
        const pointA = new geo_point.GeoPoint(40.0, -74.0);
        const pointB = new geo_point.GeoPoint(41.0, -74.0); // 1 degree north
        const bearingNorth = geo_point.GeoPoint.calculateBearing(pointA, pointB);
        assert(Math.abs(bearingNorth - 0) < 1, 'Bearing due north should be close to 0 degrees');

        // Test 3: Bearing due east
        const pointC = new geo_point.GeoPoint(40.0, -74.0);
        const pointD = new geo_point.GeoPoint(40.0, -73.0); // 1 degree east
        const bearingEast = geo_point.GeoPoint.calculateBearing(pointC, pointD);
        assert(Math.abs(bearingEast - 90) < 1, 'Bearing due east should be close to 90 degrees');

        // Test 4: Bearing due south
        const pointE = new geo_point.GeoPoint(41.0, -74.0);
        const pointF = new geo_point.GeoPoint(40.0, -74.0); // 1 degree south
        const bearingSouth = geo_point.GeoPoint.calculateBearing(pointE, pointF);
        assert(Math.abs(bearingSouth - 180) < 1, 'Bearing due south should be close to 180 degrees');

        // Test 5: Bearing due west
        const pointG = new geo_point.GeoPoint(40.0, -73.0);
        const pointH = new geo_point.GeoPoint(40.0, -74.0); // 1 degree west
        const bearingWest = geo_point.GeoPoint.calculateBearing(pointG, pointH);
        assert(Math.abs(bearingWest - 270) < 1, 'Bearing due west should be close to 270 degrees');

        // Test 6: Bearing should always be between 0 and 360
        const pointI = new geo_point.GeoPoint(-45.0, 170.0);
        const pointJ = new geo_point.GeoPoint(45.0, -170.0);
        const bearingCrossDateline = geo_point.GeoPoint.calculateBearing(pointI, pointJ);
        assert(bearingCrossDateline >= 0 && bearingCrossDateline < 360, 
               'Bearing should be between 0 and 360 degrees');

        // Test 7: Known bearing calculation (London to Paris)
        const london = new geo_point.GeoPoint(51.5074, -0.1278);
        const paris = new geo_point.GeoPoint(48.8566, 2.3522);
        const londonToParis = geo_point.GeoPoint.calculateBearing(london, paris);
        // Expected bearing is approximately 156 degrees (southeast)
        assert(londonToParis > 150 && londonToParis < 160, 
               'London to Paris bearing should be approximately 156 degrees');

        done();
    });
});