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
        
        // Test error cases
        
        // Test with non-object argument
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON(null);
        }, TypeError, 'GeoPoint: Argument must be an object');
        
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON('string');
        }, TypeError, 'GeoPoint: Argument must be an object');
        
        // Test missing type property
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                coordinates: [-0.15, 51.5]
            });
        }, TypeError, 'Object must have type and coordinates');
        
        // Test missing coordinates property
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point'
            });
        }, TypeError, 'Object must have type and coordinates');
        
        // Test wrong type value
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'LineString',
                coordinates: [-0.15, 51.5]
            });
        }, TypeError, 'The value of type should be \'Point\'');
        
        // Test coordinates not an array
        assert.throws(() => {
            geo_point.GeoPoint.fromGeoJSON({
                type: 'Point',
                coordinates: 'not an array'
            });
        }, TypeError, 'coordinates must be an array and contain 2 elements');
        
        // Test coordinates array with wrong length
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