Your task is to write a test for the following function:
```
q.dispatch(object, op, args)
```

This function is defined as follows:
```
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.dispatch', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.