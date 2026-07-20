Your task is to write a test for the following function:
```
// Requests the names of the owned properties of a promised
// object in a future turn.
// @param object    promise or immediate reference for target object
// @return promise for the keys of the eventually settled object

q.keys(object)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.keys', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.