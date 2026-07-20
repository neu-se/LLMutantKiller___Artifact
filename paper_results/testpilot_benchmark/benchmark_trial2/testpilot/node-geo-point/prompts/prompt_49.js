Your task is to write a test for the following function:
```
geo-point.GeoPoint.fromGeoJSON(point)
```

This function is defined as follows:
```
fromGeoJSON(point) {
        if (!isObject(point)) {
            throw new TypeError('GeoPoint: Argument must be an object');
        }
        if (!point.hasOwnProperty('type') || !point.hasOwnProperty('coordinates')) {
            throw new TypeError('Object must have type and coordinates');
        }
        if (point.type !== 'Point') {
            throw new TypeError('The value of type should be \'Point\'');
        }
        if (!Array.isArray(point.coordinates) || point.coordinates.length !== 2) {
            throw new TypeError('coordinates must be an array and contain 2 elements');
        }
        return this.fromLngLatArray(point.coordinates);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.