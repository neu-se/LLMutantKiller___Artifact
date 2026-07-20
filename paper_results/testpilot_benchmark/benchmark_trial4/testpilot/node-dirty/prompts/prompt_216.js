Your task is to write a test for the following function:
```
dirty.Dirty.prototype.close()
```

This function is defined as follows:
```
close() {
    if (this._queue.size || this._inFlightWrites > 0) {
      this.once('drain', () => this.close());
      return;
    }
    if (this._readStream) this._readStream.destroy();
    if (this._writeStream) this._writeStream.end(() => this._writeStream.destroy());
  }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.prototype.close', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.