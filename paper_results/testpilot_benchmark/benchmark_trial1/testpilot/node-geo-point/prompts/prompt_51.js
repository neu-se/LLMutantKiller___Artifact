Your task is to write a test for the following function:
```
geo-point.GeoPoint.fromGeoJSON(point)
```

You may use the following examples to guide your implementation:
```
// usage #1
const point = GeoPoint.fromGeoJSON({  type: 'Point',  coordinates: [-0.15, 51.5]});
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