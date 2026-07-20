Your task is to write a test for the following function:
```
geo-point.GeoPoint.calculateBearing(point1, point2)
```

This function is defined as follows:
```
calculateBearing(point1, point2) {
        const φ1 = deg2rad(point1.latitude), φ2 = deg2rad(point2.latitude);
        const Δλ = deg2rad(point2.longitude - point1.longitude);
        // see http://mathforum.org/library/drmath/view/55417.html
        const y = sin(Δλ) * cos(φ2);
        const x = cos(φ1) * sin(φ2) - sin(φ1) * cos(φ2) * cos(Δλ);
        const θ = atan2(y, x);
        return (rad2deg(θ) + 360) % 360;
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const bearing = startPoint.calculateBearing(endPoint);
// usage #2
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = new GeoPoint(52.5, -1.15);const bearing = startPoint.calculateBearing(endPoint);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateBearing', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.