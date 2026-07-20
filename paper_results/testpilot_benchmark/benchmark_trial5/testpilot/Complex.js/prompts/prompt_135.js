Your task is to write a test for the following function:
```
// Calculate the complex arcus sinus
// @returns {Complex}

complex.js.ZERO.asin()
```

This function is defined as follows:
```
function() {

      // asin(c) = -i * log(ci + sqrt(1 - c^2))

      var a = this['re'];
      var b = this['im'];

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1['re'] - b,
        t1['im'] + a)['log']();

      return new Complex(t2['im'], -t2['re']);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.asin', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.