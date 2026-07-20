Your task is to write a test for the following function:
```
dirty.Dirty.prototype.get(key)
```

This function is defined as follows:
```
get(key) {
    return this._data.get(key);
  }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.