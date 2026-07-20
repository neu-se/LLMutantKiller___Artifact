Your task is to write a test for the following function:
```
class geo-point.GeoPoint(latitude, longitude)
```

You may use the following examples to guide your implementation:
```
// usage #1
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const bearing = startPoint.calculateBearing(endPoint);
// usage #2
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = startPoint.calculateDestination(1000, 90);
// usage #3
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const distance = startPoint.calculateDistance(endPoint);
// usage #4
const startPoint = new GeoPoint(51.5, -0.15);const { x, y } = startPoint.toTile(7);
// usage #5
const point = new GeoPoint(51.5, -0.15);const geoJson = point.toGeoJSON();geoJson.should.have.keys(['type', 'coordinates']);geoJson.type.should.equals('Point');geoJson.coordinates.should.deep.equals([-0.15, 51.5]);
// usage #6
const point = new GeoPoint(51.5, -0.15);point.toPlainObject().should.have.keys(['latitude', 'longitude']);
// usage #7
const point = new GeoPoint(51.5, -0.15);point.toLatLngArray().should.deep.equals([51.5, -0.15]);
// usage #8
const point = new GeoPoint(51.5, -0.15);point.toLngLatArray().should.deep.equals([-0.15, 51.5]);
// usage #9
const point1 = new GeoPoint(51.5, -0.15);const point2 = new GeoPoint(51.6, -0.15);const distanceInMeters = GeoPoint.calculateDistance(point1, point2);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.