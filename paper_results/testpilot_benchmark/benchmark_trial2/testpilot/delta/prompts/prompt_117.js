Your task is to write a test for the following function:
```
quill-delta.prototype.reduce(predicate, initialValue)
```

This function is defined as follows:
```
reduce(predicate, initialValue) {
        return this.ops.reduce(predicate, initialValue);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.