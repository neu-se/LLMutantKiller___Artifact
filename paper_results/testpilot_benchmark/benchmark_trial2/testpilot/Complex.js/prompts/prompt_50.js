Your task is to write a test for the following function:
```
complex.js.ZERO.mul(a, b)
```

You may use the following examples to guide your implementation:
```
// usage #1
let Complex = require('complex.js');let c = new Complex("99.3+8i");c.mul({re: 3, im: 9}).div(4.9).sub(3, 2);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.