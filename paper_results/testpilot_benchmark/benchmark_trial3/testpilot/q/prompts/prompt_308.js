Your task is to write a test for the following function:
```
// Works almost like "finally", but not called for rejections.
// Original resolution value is passed through callback unaffected.
// Callback may return a promise that will be awaited for.
// @param {Function} callback
// @returns {Q.Promise}
// @example
// doSomething()
// .then(...)
// .tap(console.log)
// .then(...);

q.makePromise.prototype.tap(callback)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.makePromise.prototype.tap', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.