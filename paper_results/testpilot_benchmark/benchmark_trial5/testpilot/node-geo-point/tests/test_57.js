let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON', function(done) {
        // Test valid GeoJSON point
        const validPoint = geo_point.GeoPoint.fromGeoJSON({
            type: 'Point',
            coordinates: [-0.15, 51.5]
        });
        assert(validPoint instanceof geo_point.GeoPoint);
        
        // Test with different valid coordinates
        const validPoint2 = geo_point.GeoPoint.fromGeoJSON({
            type: 'Point',
            coordinates: [0, 0]
        });
        assert(validPoint2 instanceof geo_point.GeoPoint);
        
        // Test error: non-object argument
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON("not an object");
        }, TypeError, 'GeoPoint: Argument must be an object');
        
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON(null);
        }, TypeError, 'GeoPoint: Argument must be an object');
        
        // Test error: missing type property
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                coordinates: [-0.15, 51.5]
            });
        }, TypeError, 'Object must have type and coordinates');
        
        // Test error: missing coordinates property
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point'
            });
        }, TypeError, 'Object must have type and coordinates');
        
        // Test error: wrong type value
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'LineString',
                coordinates: [-0.15, 51.5]
            });
        }, TypeError, 'The value of type should be \'Point\'');
        
        // Test error: coordinates not an array
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point',
                coordinates: "not an array"
            });
        }, TypeError, 'coordinates must be an array and contain 2 elements');
        
        // Test error: coordinates array with wrong length
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point',
                coordinates: [-0.15]
            });
        }, TypeError, 'coordinates must be an array and contain 2 elements');
        
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point',
                coordinates: [-0.15, 51.5, 100]
            });
        }, TypeError, 'coordinates must be an array and contain 2 elements');
        
        done();
    });
});