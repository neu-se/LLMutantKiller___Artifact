let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toGeoJSON', function(done) {
        // Test case 1: Basic functionality with positive coordinates
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const geoJson1 = point1.toGeoJSON();
        
        assert(geoJson1.hasOwnProperty('type'), 'GeoJSON should have type property');
        assert(geoJson1.hasOwnProperty('coordinates'), 'GeoJSON should have coordinates property');
        assert.strictEqual(geoJson1.type, 'Point', 'Type should be Point');
        assert.deepStrictEqual(geoJson1.coordinates, [-0.15, 51.5], 'Coordinates should be [longitude, latitude]');
        
        // Test case 2: Zero coordinates
        const point2 = new geo_point.GeoPoint(0, 0);
        const geoJson2 = point2.toGeoJSON();
        
        assert.strictEqual(geoJson2.type, 'Point');
        assert.deepStrictEqual(geoJson2.coordinates, [0, 0]);
        
        // Test case 3: Negative latitude and positive longitude
        const point3 = new geo_point.GeoPoint(-33.8688, 151.2093);
        const geoJson3 = point3.toGeoJSON();
        
        assert.strictEqual(geoJson3.type, 'Point');
        assert.deepStrictEqual(geoJson3.coordinates, [151.2093, -33.8688]);
        
        // Test case 4: Both negative coordinates
        const point4 = new geo_point.GeoPoint(-40.7128, -74.0060);
        const geoJson4 = point4.toGeoJSON();
        
        assert.strictEqual(geoJson4.type, 'Point');
        assert.deepStrictEqual(geoJson4.coordinates, [-74.0060, -40.7128]);
        
        // Test case 5: Verify only expected properties exist
        const point5 = new geo_point.GeoPoint(37.7749, -122.4194);
        const geoJson5 = point5.toGeoJSON();
        const keys = Object.keys(geoJson5);
        
        assert.strictEqual(keys.length, 2, 'GeoJSON should have exactly 2 properties');
        assert(keys.includes('type'), 'Should include type property');
        assert(keys.includes('coordinates'), 'Should include coordinates property');
        
        done();
    });
});