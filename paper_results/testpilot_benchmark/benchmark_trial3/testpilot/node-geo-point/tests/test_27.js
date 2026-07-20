let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toGeoJSON', function(done) {
        // Test with positive coordinates
        const point1 = new geo_point.GeoPoint(51.5, -0.15);
        const geoJson1 = point1.toGeoJSON();
        
        assert(geoJson1.hasOwnProperty('type'), 'GeoJSON should have type property');
        assert(geoJson1.hasOwnProperty('coordinates'), 'GeoJSON should have coordinates property');
        assert.strictEqual(geoJson1.type, 'Point', 'Type should be Point');
        assert.deepStrictEqual(geoJson1.coordinates, [-0.15, 51.5], 'Coordinates should be [longitude, latitude]');
        
        // Test with negative coordinates
        const point2 = new geo_point.GeoPoint(-34.6037, -58.3816);
        const geoJson2 = point2.toGeoJSON();
        
        assert.strictEqual(geoJson2.type, 'Point', 'Type should be Point for negative coordinates');
        assert.deepStrictEqual(geoJson2.coordinates, [-58.3816, -34.6037], 'Should handle negative coordinates correctly');
        
        // Test with zero coordinates
        const point3 = new geo_point.GeoPoint(0, 0);
        const geoJson3 = point3.toGeoJSON();
        
        assert.strictEqual(geoJson3.type, 'Point', 'Type should be Point for zero coordinates');
        assert.deepStrictEqual(geoJson3.coordinates, [0, 0], 'Should handle zero coordinates correctly');
        
        // Test with decimal coordinates
        const point4 = new geo_point.GeoPoint(40.7128, -74.0060);
        const geoJson4 = point4.toGeoJSON();
        
        assert.strictEqual(geoJson4.type, 'Point', 'Type should be Point for decimal coordinates');
        assert.deepStrictEqual(geoJson4.coordinates, [-74.0060, 40.7128], 'Should handle decimal coordinates correctly');
        
        done();
    });
    
    })