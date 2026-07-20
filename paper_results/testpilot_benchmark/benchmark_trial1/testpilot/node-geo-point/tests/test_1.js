```javascript
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    describe('GeoPoint constructor', function() {
        it('should create a valid GeoPoint with valid coordinates', function() {
            const point = new geo_point.GeoPoint(40.7128, -74.0060);
            assert.strictEqual(point.latitude, 40.7128);
            assert.strictEqual(point.longitude, -74.0060);
        });

        it('should throw RangeError for non-number latitude', function() {
            assert.throws(() => {
                new geo_point.GeoPoint('40.7128', -74.0060);
            }, RangeError, 'Bad geo point arguments');
        });

        it('should throw RangeError for non-number longitude', function() {
            assert.throws(() => {
                new geo_point.GeoPoint(40.7128, '-74.0060');
            }, RangeError, 'Bad geo point arguments');
        });

        it('should throw RangeError for latitude out of range (> 90)', function() {
            assert.throws(() => {
                new geo_point.GeoPoint(91, -74.0060);
            }, RangeError, 'bad latitude value');
        });

        it('should throw RangeError for latitude out of range (< -90)', function() {
            assert.throws(() => {
                new geo_point.GeoPoint(-91, -74.0060);
            }, RangeError, 'bad latitude value');
        });

        it('should throw RangeError for longitude out of range (> 180)', function() {
            assert.throws(() => {
                new geo_point.GeoPoint(40.7128, 181);
            }, RangeError, 'bad longitude value');
        });

        it('should throw RangeError for longitude out of range (< -180)', function() {
            assert.throws(() => {
                new geo_point.GeoPoint(40.7128, -181);
            }, RangeError, 'bad longitude value');
        });
    });

    describe('fromGeoJSON static method', function() {
        it('should create GeoPoint from valid GeoJSON', function() {
            const geoJSON = {
                type: 'Point',
                coordinates: [-74.0060, 40.7128]
            };
            const point = geo_point.GeoPoint.fromGeoJSON(geoJSON);
            assert.strictEqual(point.latitude, 40.7128);
            assert.strictEqual(point.longitude, -74.0060);
        });

        it('should throw TypeError for non-object argument', function() {
            assert.throws(() => {
                geo_point.GeoPoint.fromGeoJSON('not an object');
            }, TypeError, 'GeoPoint: Argument must be an object');
        });

        it('should throw TypeError for missing type property', function() {
            assert.throws(() => {
                geo_point.GeoPoint.fromGeoJSON({ coordinates: [-74.0060, 40.7128] });
            }, TypeError, 'Object must have type and coordinates');
        });

        it('should throw TypeError for wrong type value', function() {
            assert.throws(() => {
                geo_point.GeoPoint.fromGeoJSON({
                    type: 'LineString',
                    coordinates: [-74.0060, 40.7128]
                });
            }, TypeError, 'The value of type should be \'Point\'');
        });
    });

    describe('fromObject static method', function() {
        it('should create GeoPoint from valid object', function() {
            const obj = { latitude: 40.7128, longitude: -74.0060 };
            const point = geo_point.GeoPoint.fromObject(obj);
            assert.strictEqual(point.latitude, 40.7128);
            assert.strictEqual(point.longitude, -74.0060);
        });

        it('should throw TypeError for non-object argument', function() {
            assert.throws(() => {
                geo_point.GeoPoint.fromObject('not an object');
            }, TypeError, 'GeoPoint: Argument must be an object');
        });

        it('should throw TypeError for missing latitude property', function() {
            assert.throws(() => {
                geo_point.GeoPoint.fromObject({ longitude: -74.0060 });
            }, TypeError, 'Object must have latitude and longitude');
        });
    });

    describe('fromLatLngArray static method', function() {
        it('should create GeoPoint from lat/lng array', function() {
            const point = geo_point.GeoPoint.fromLatLngArray([40.7128, -74.0060]);
            assert.strictEqual(point.latitude, 40.7128);
            assert.strictEqual(point.longitude, -74.0060);
        });
    });

    describe('fromLngLatArray static method', function() {
        it('should create GeoPoint from lng/lat array', function() {
            const point = geo_point.GeoPoint.fromLngLatArray([-74.0060, 40.7128]);
            assert.strictEqual(point.latitude, 40.7128);
            assert.strictEqual(point.longitude, -74.0060);
        });
    });

    describe('instance methods', function() {
        let point1, point2;

        beforeEach(function() {
            point1 = new geo_point.GeoPoint(40.7128, -74.0060); // NYC
            point2 = new geo_point.GeoPoint(34.0522, -118.2437); // LA
        });

        it('should convert to string', function() {
            assert.strictEqual(point1.toString(), '40.7128,-74.006');
        });

        it('should convert to GeoJSON', function() {
            const geoJSON = point1.toGeoJSON();
            assert.deepStrictEqual(geoJSON, {
                type: 'Point',
                coordinates: [-74.0060, 40.7128]
            });
        });

        it('should convert to object', function() {
            const obj = point1.toObject();
            assert.deepStrictEqual(obj, {
                latitude: 40.7128,
                longitude: -74.0060
            });
        });

        it('should convert to lat/lng array', function() {
            const array = point1.toLatLngArray();
            assert.deepStrictEqual(array, [40.7128, -74.0060]);
        });

        it('should convert to lng/lat array', function() {
            const array = point1.toLngLatArray();
            assert.deepStrictEqual(array, [-74.0060, 40.7128]);
        });

        it('should calculate distance between points', function() {
            const distance = point1.calculateDistance(point2);
            assert(typeof distance === 'number');
            assert(distance > 0);
            // Distance between NYC and LA should be roughly 3944 km
            assert(Math.abs(distance - 3944000) < 100000);
        });

        it('should calculate bearing between points', function() {
            const bearing = point1.calculateBearing(point2);
            assert(typeof bearing === 'number');
            assert(bearing >= 0 && bearing < 360);
        });

        it('should calculate destination point', function() {
            const destination = point1.calculateDestination(1000, 90); // 1km east
            assert(destination instanceof geo_point.GeoPoint);
            assert(destination.longitude > point1.longitude);
            assert(Math.abs(destination.latitude - point1.latitude) < 0.01);
        });

        it('should adjust precision', function() {
            const point = new geo_point.GeoPoint(40.123456789, -74.987654321);
            const adjusted = point.adjustPrecision(2);
            assert.strictEqual(adjusted.latitude, 40.12);
            assert