Your task is to write a test for the following function:
```
geo-point.GeoPoint.calculateDestination(coordinate, distance, bearing)
```

This function is defined as follows:
```
calculateDestination(coordinate, distance, bearing) {
        // sinφ2 = sinφ1⋅cosδ + cosφ1⋅sinδ⋅cosθ
        // tanΔλ = sinθ⋅sinδ⋅cosφ1 / cosδ−sinφ1⋅sinφ2
        // see http://williams.best.vwh.net/avform.htm#LL
        const δ = Number(distance) / radius; // angular distance in radians
        const θ = deg2rad(Number(bearing));
        const φ1 = deg2rad(coordinate.latitude);
        const λ1 = deg2rad(coordinate.longitude);
        const sinφ1 = sin(φ1), cosφ1 = cos(φ1);
        const sinδ = sin(δ), cosδ = cos(δ);
        const sinθ = sin(θ), cosθ = cos(θ);
        const sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
        const φ2 = asin(sinφ2);
        const y = sinθ * sinδ * cosφ1;
        const x = cosδ - sinφ1 * sinφ2;
        const λ2 = λ1 + atan2(y, x);
        const latitude = rad2deg(φ2);
        const longitude = (rad2deg(λ2) + 540) % 360 - 180; // normalise to −180..+180°
        return new GeoPoint(latitude, longitude);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.calculateDestination', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.