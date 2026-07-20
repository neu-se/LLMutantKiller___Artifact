let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDistance - same point', function(done) {
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        let point2 = new geo_point.GeoPoint(40.7128, -74.0060); // Same location
        
        let distance = point1.calculateDistance(point2);
        assert.strictEqual(distance, 0, 'Distance between same points should be 0');
        done();
    });

    })