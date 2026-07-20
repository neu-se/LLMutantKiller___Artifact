Your task is to write a test for the following function:
```
// Constructs a promise for an immediate reference, passes promises through, or
// coerces promises from different systems.
// @param value immediate reference or promise

q(value)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.