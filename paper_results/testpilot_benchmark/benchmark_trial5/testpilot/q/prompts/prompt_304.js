Your task is to write a test for the following function:
```
q.isPending(object)
```

This function is defined as follows:
```
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.isPending', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.