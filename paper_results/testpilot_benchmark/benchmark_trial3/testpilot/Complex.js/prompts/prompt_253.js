Your task is to write a test for the following function:
```
complex.js.ZERO.equals(a, b)
```

This function is defined as follows:
```
function(a, b) {

      var z = new Complex(a, b);

      return Math.abs(z['re'] - this['re']) <= Complex['EPSILON'] &&
        Math.abs(z['im'] - this['im']) <= Complex['EPSILON'];
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.