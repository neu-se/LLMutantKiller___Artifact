Your task is to write a test for the following function:
```
// Determines whether a complex number is not at the infinity pole of the
// Riemann sphere.
// @returns {boolean}

complex.js.ZERO.isFinite()
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.isFinite', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.