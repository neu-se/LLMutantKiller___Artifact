Your task is to write a test for the following function:
```
// Passes a continuation to a Node function, which is called with the given
// arguments provided individually, and returns a promise.
// @example
// Q.nfcall(FS.readFile, __filename)
// .then(function (content) {
// })

q.nfcall(callback /*...args*/)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.nfcall', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.