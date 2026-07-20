let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with decimal precision', function(done) {
        // Test with high precision coordinates
        const geoJsonPoint = {
            type: "Point",
            coordinates: [-122.41941550, 37.77493123]
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJsonPoint);
        
        assert.strictEqual(point.latitude(), 37.77493123);
        assert.strictEqual(point.longitude(), -122.41941550);
        done();
    });
});