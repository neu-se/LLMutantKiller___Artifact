let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing - North bearing', function(done) {
        let point1 = new geo_point.GeoPoint(0, 0);
        let point2 = new geo_point.GeoPoint(1, 0);
        let bearing = geo_point.GeoPoint.calculateBearing(point1, point2);
        assert.strictEqual(bearing, 0, 'Bearing should be 0 degrees for due north');
        done();
    });

    })