Your task is to write a test for the following function:
```
quill-delta.prototype.retain(length, attributes)
```

This function is defined as follows:
```
retain(length, attributes) {
        if (typeof length === 'number' && length <= 0) {
            return this;
        }
        const newOp = { retain: length };
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.