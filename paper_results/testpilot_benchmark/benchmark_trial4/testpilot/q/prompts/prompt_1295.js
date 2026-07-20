Your task is to write a test for the following function:
```
q.progress(object, progressed)
```

You may use the following examples to guide your implementation:
```
// usage #1
return uploadFile().progress(function (progress) {    // We get notified of the upload's progress});
// usage #2
return uploadFile().progress(function (progress) {    // We get notified of the upload's progress});
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.progress', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.