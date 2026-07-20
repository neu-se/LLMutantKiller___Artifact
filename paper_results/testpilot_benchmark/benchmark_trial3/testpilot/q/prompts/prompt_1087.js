Your task is to write a test for the following function:
```
// Sets the value of a property in a future turn.
// @param object    promise or immediate reference for object object
// @param name      name of property to set
// @param value     new value of property
// @return promise for the return value

q.set(object, key, value)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.set', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.