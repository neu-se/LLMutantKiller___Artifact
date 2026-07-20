Your task is to write a test for the following function:
```
complex.js.ZERO.toString()
```

You may use the following examples to guide your implementation:
```
// usage #1
new Complex(1, 2).toString(); // 1 + 2inew Complex(0, 1).toString(); // inew Complex(9, 0).toString(); // 9new Complex(1, 1).toString(); // 1 + i
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.