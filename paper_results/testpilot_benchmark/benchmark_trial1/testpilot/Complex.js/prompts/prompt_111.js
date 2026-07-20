Your task is to write a test for the following function:
```
// Calculate the cosine
// @returns {Complex}

complex.js.ZERO.cos()
```

This function is defined as follows:
```
function() {

      // cos(z) = ( e^iz + e^-iz ) / 2 
      //        = cos(a)cosh(b) - i sin(a)sinh(b)

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.cos(a) * cosh(b),
        -Math.sin(a) * sinh(b));
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.cos', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.