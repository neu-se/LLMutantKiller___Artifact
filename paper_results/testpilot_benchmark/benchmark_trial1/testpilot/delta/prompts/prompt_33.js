Your task is to write a test for the following function:
```
quill-delta.OpIterator.prototype.rest()
```

This function is defined as follows:
```
rest() {
        if (!this.hasNext()) {
            return [];
        }
        else if (this.offset === 0) {
            return this.ops.slice(this.index);
        }
        else {
            const offset = this.offset;
            const index = this.index;
            const next = this.next();
            const rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
        }
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.