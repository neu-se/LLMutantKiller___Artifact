Your task is to write a test for the following function:
```
// Passes a continuation to a Node function, which is called with the given
// arguments provided as an array, and returns a promise.
// Q.nfapply(FS.readFile, [__filename])
// .then(function (content) {
// })

q.nfapply(callback, args)
```

This function is defined as follows:
```
function (callback, args) {
    return Q(callback).nfapply(args);
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.nfapply', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.