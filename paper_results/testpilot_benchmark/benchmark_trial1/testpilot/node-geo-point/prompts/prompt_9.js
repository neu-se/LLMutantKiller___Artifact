Your task is to write a test for the following function:
```
geo-point.GeoPoint.prototype.calculateDestination(distance, bearing)
```

You may use the following examples to guide your implementation:
```
// usage #1
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = startPoint.calculateDestination(1000, 90);
// usage #2
const startPoint = new GeoPoint(51.5, -0.15);const endPoint = startPoint.calculateDestination(1000, 90);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.calculateDestination', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.