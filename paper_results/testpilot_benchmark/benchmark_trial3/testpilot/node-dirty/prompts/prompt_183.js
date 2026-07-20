Your task is to write a test for the following function:
```
dirty.Dirty.prototype.rm(key, cb)
```

This function is defined as follows:
```
rm(key, cb) {
    this.set(key, undefined, cb);
  }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.