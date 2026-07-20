```javascript
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint constructor', function(done) {
        // Test valid constructor
        const point = new geo_point.GeoPoint(51.5, -0.15);
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        
        // Test invalid arguments - non-numbers
        assert.throws(() => new geo_point.GeoPoint('51.5', -0.15), RangeError, 'Bad geo point arguments');
        assert.throws(() => new geo_point.GeoPoint(51.5, '-0.15'), RangeError, 'Bad geo point arguments');
        
        // Test invalid latitude range
        assert.throws(() => new geo_point.GeoPoint(-91, -0.15), RangeError, 'bad latitude value');
        assert.throws(() => new geo_point.GeoPoint(91, -0.15), RangeError, 'bad latitude value');
        
        // Test invalid longitude range
        assert.throws(() => new geo_point.GeoPoint(51.5, -181), RangeError, 'bad longitude value');
        assert.throws(() => new geo_point.GeoPoint(51.5, 181), RangeError, 'bad longitude value');
        
        done();
    });
    
    it('test calculateBearing', function(done) {
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = new geo_point.GeoPoint(52.5, -1.15);
        const bearing = startPoint.calculateBearing(endPoint);
        
        assert.strictEqual(typeof bearing, 'number');
        assert(bearing >= 0 && bearing < 360);
        
        done();
    });
    
    it('test calculateDestination', function(done) {
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = startPoint.calculateDestination(1000, 90);
        
        assert(endPoint instanceof geo_point.GeoPoint);
        assert.strictEqual(typeof endPoint.latitude, 'number');
        assert.strictEqual(typeof endPoint.longitude, 'number');
        
        done();
    });
    
    it('test calculateDistance', function(done) {
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const endPoint = new geo_point.GeoPoint(52.5, -1.15);
        const distance = startPoint.calculateDistance(endPoint);
        
        assert.strictEqual(typeof distance, 'number');
        assert(distance > 0);
        
        // Test static method
        const staticDistance = geo_point.GeoPoint.calculateDistance(startPoint, endPoint);
        assert.strictEqual(distance, staticDistance);
        
        done();
    });
    
    it('test toTile', function(done) {
        const startPoint = new geo_point.GeoPoint(51.5, -0.15);
        const { x, y } = startPoint.toTile(7);
        
        assert.strictEqual(typeof x, 'number');
        assert.strictEqual(typeof y, 'number');
        assert(Number.isInteger(x));
        assert(Number.isInteger(y));
        
        done();
    });
    
    it('test toGeoJSON', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        const geoJson = point.toGeoJSON();
        
        assert(geoJson.hasOwnProperty('type'));
        assert(geoJson.hasOwnProperty('coordinates'));
        assert.strictEqual(geoJson.type, 'Point');
        assert.deepStrictEqual(geoJson.coordinates, [-0.15, 51.5]);
        
        done();
    });
    
    it('test toObject', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        const obj = point.toObject();
        
        assert(obj.hasOwnProperty('latitude'));
        assert(obj.hasOwnProperty('longitude'));
        assert.strictEqual(obj.latitude, 51.5);
        assert.strictEqual(obj.longitude, -0.15);
        
        done();
    });
    
    it('test toLatLngArray', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        const array = point.toLatLngArray();
        
        assert.deepStrictEqual(array, [51.5, -0.15]);
        
        done();
    });
    
    it('test toLngLatArray', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        const array = point.toLngLatArray();
        
        assert.deepStrictEqual(array, [-0.15, 51.5]);
        
        done();
    });
    
    it('test toString', function(done) {
        const point = new geo_point.GeoPoint(51.5, -0.15);
        const str = point.toString();
        
        assert.strictEqual(str, '51.5,-0.15');
        
        done();
    });
    
    it('test adjustPrecision', function(done) {
        const point = new geo_point.GeoPoint(51.123456789, -0.987654321);
        const adjusted = point.adjustPrecision(2);
        
        assert.strictEqual(adjusted.latitude, 51.12);
        assert.strictEqual(adjusted.longitude, -0.99);
        
        done();
    });
    
    it('test static fromObject', function(done) {
        const obj = { latitude: 51.5, longitude: -0.15 };
        const point = geo_point.GeoPoint.fromObject(obj);
        
        assert(point instanceof geo_point.GeoPoint);
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        
        // Test invalid object
        assert.throws(() => geo_point.GeoPoint.fromObject('not an object'), TypeError);
        assert.throws(() => geo_point.GeoPoint.fromObject({ latitude: 51.5 }), TypeError);
        
        done();
    });
    
    it('test static fromGeoJSON', function(done) {
        const geoJson = {
            type: 'Point',
            coordinates: [-0.15, 51.5]
        };
        const point = geo_point.GeoPoint.fromGeoJSON(geoJson);
        
        assert(point instanceof geo_point.GeoPoint);
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        
        // Test invalid GeoJSON
        assert.throws(() => geo_point.GeoPoint.fromGeoJSON('not an object'), TypeError);
        assert.throws(() => geo_point.GeoPoint.fromGeoJSON({ type: 'Point' }), TypeError);
        assert.throws(() => geo_point.GeoPoint.fromGeoJSON({ type: 'LineString', coordinates: [-0.15, 51.5] }), TypeError);
        
        done();
    });
    
    it('test static fromLatLngArray', function(done) {
        const array = [51.5, -0.15];
        const point = geo_point.GeoPoint.fromLatLngArray(array);
        
        assert(point instanceof geo_point.GeoPoint);
        assert.strictEqual(point.latitude, 51.5);
        assert.strictEqual(point.longitude, -0.15);
        