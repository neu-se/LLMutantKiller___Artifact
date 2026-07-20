Your task is to write a test for the following function:
```
geo-point.GeoPoint.toTile(coordinate, zoom)
```

This function is defined as follows:
```
toTile(coordinate, zoom) {
        // retrieved from: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
        const x = Math.floor((coordinate.longitude + 180) / 360 * Math.pow(2, zoom));
        const y = Math.floor((1 - Math.log(Math.tan(coordinate.latitude * Math.PI / 180) + 1 / Math.cos(coordinate.latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
        return { x, y };
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');
describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.