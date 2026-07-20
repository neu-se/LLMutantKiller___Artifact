Your task is to write a test for the following function:
```
// Terminates a chain of promises, forcing rejections to be
// thrown as exceptions.
// @param {Any*} promise at the end of a chain of promises
// @returns nothing

q.done(object, fulfilled, rejected, progress)
```

This function is defined as follows:
```
function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.done', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.