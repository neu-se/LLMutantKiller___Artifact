Your task is to write a test for the following function:
```
complex.js.ZERO.asech()
```

This function is defined as follows:
```
function() {

      // asech(c) = log((1+sqrt(1-c^2))/c)

      var a = this['re'];
      var b = this['im'];

      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).acosh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acosh();
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.