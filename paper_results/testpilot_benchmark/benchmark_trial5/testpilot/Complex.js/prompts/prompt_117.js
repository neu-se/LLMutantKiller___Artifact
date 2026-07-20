Your task is to write a test for the following function:
```
// Calculate the tangent
// @returns {Complex}

complex.js.ZERO.tan()
```

This function is defined as follows:
```
function() {

      // tan(z) = sin(z) / cos(z) 
      //        = ( e^iz - e^-iz ) / ( i( e^iz + e^-iz ) )
      //        = ( e^2iz - 1 ) / i( e^2iz + 1 )
      //        = ( sin(2a) + i sinh(2b) ) / ( cos(2a) + cosh(2b) )

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = Math.cos(a) + cosh(b);

      return new Complex(
        Math.sin(a) / d,
        sinh(b) / d);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.tan', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.