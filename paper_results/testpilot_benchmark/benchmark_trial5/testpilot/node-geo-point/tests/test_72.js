let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing - same point', function(done) {
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let point2 = new geo_point.GeoPoint(40.7128, -74.0060); // Same point
        
        let bearing = geo_point.GeoPoint.calculateBearing(point1, point2);
        
        // Bearing should be 0 or NaN for same points
        assert(bearing === 0 || isNaN(bearing), 'Bearing between same points should be 0 or NaN');
        done();
    });

    })