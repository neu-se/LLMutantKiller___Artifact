Your task is to write a test for the following function:
```
geo-point.GeoPoint.prototype.toLngLatArray()
```

This function is defined as follows:
```
toLngLatArray() {
        return [this.longitude, this.latitude];
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
const point = new GeoPoint(51.5, -0.15);point.toLngLatArray().should.deep.equals([-0.15, 51.5]);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toLngLatArray', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.