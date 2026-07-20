Your task is to write a test for the following function:
```
complex.js.ZERO.inverse()
```

This function is defined as follows:
```
function() {

      // 1 / 0 = Infinity and 1 / Infinity = 0
      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      if (this['isInfinite']()) {
        return Complex['ZERO'];
      }

      var a = this['re'];
      var b = this['im'];

      var d = a * a + b * b;

      return new Complex(a / d, -b / d);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.