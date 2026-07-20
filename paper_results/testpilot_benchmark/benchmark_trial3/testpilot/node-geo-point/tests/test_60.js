let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromObject', function(done) {
        // Test valid object with latitude and longitude
        const validObject = { latitude: 51.5, longitude: -0.15 };
        const point = geo_point.GeoPoint.fromObject(validObject);
        assert(point instanceof geo_point.GeoPoint, 'Should return a GeoPoint instance');
        assert.strictEqual(point.latitude, 51.5, 'Latitude should be set correctly');
        assert.strictEqual(point.longitude, -0.15, 'Longitude should be set correctly');

        // Test with zero coordinates
        const zeroObject = { latitude: 0, longitude: 0 };
        const zeroPoint = geo_point.GeoPoint.fromObject(zeroObject);
        assert.strictEqual(zeroPoint.latitude, 0, 'Zero latitude should be handled');
        assert.strictEqual(zeroPoint.longitude, 0, 'Zero longitude should be handled');

        // Test with negative coordinates
        const negativeObject = { latitude: -45.5, longitude: -122.3 };
        const negativePoint = geo_point.GeoPoint.fromObject(negativeObject);
        assert.strictEqual(negativePoint.latitude, -45.5, 'Negative latitude should be handled');
        assert.strictEqual(negativePoint.longitude, -122.3, 'Negative longitude should be handled');

        // Test error cases - non-object arguments
        assert.throws(() => {
            geo_point.GeoPoint.fromObject(null);
        }, TypeError, 'Should throw TypeError for null');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject(undefined);
        }, TypeError, 'Should throw TypeError for undefined');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject('string');
        }, TypeError, 'Should throw TypeError for string');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject(123);
        }, TypeError, 'Should throw TypeError for number');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject([1, 2]);
        }, TypeError, 'Should throw TypeError for array');

        // Test error cases - missing properties
        assert.throws(() => {
            geo_point.GeoPoint.fromObject({});
        }, TypeError, 'Should throw TypeError for empty object');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject({ latitude: 51.5 });
        }, TypeError, 'Should throw TypeError for missing longitude');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject({ longitude: -0.15 });
        }, TypeError, 'Should throw TypeError for missing latitude');

        assert.throws(() => {
            geo_point.GeoPoint.fromObject({ lat: 51.5, lng: -0.15 });
        }, TypeError, 'Should throw TypeError for wrong property names');

        // Test with extra properties (should work)
        const extraPropsObject = { latitude: 40.7, longitude: -74.0, name: 'NYC', elevation: 10 };
        const extraPropsPoint = geo_point.GeoPoint.fromObject(extraPropsObject);
        assert.strictEqual(extraPropsPoint.latitude, 40.7, 'Should work with extra properties');
        assert.strictEqual(extraPropsPoint.longitude, -74.0, 'Should work with extra properties');

        done();
    });
});