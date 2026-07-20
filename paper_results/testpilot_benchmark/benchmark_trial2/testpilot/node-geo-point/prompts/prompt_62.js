Your task is to write a test for the following function:
```
geo-point.GeoPoint.calculateDistance(point1, point2)
```

This function is defined as follows:
```
calculateDistance(point1, point2) {
        const point1Rad = deg2rad(point1.latitude);
        const point2Rad = deg2rad(point2.latitude);
        const a = deg2rad(point2.longitude) - deg2rad(point1.longitude);
        const b = cos(point1Rad) * cos(point2Rad) * cos(a);
        const c = sin(point1Rad) * sin(point2Rad);
        const r = b + c;
        return acos(r > 1 ? 1 : r) * 6371392.896;
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const distance = startPoint.calculateDistance(endPoint);
// usage #2
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const distance = startPoint.calculateDistance(endPoint);
// usage #3
const point1 = new GeoPoint(51.5, -0.15);const point2 = new GeoPoint(51.6, -0.15);const distanceInMeters = GeoPoint.calculateDistance(point1, point2);
// usage #4
const point1 = new GeoPoint(51.5, -0.15);const point2 = new GeoPoint(51.6, -0.15);const distanceInMeters = GeoPoint.calculateDistance(point1, point2);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDistance', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.