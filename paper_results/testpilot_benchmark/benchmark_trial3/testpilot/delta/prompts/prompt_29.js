Your task is to write a test for the following function:
```
quill-delta.Op.length(op)
```

This function is defined as follows:
```
function length(op) {
        if (typeof op.delete === 'number') {
            return op.delete;
        }
        else if (typeof op.retain === 'number') {
            return op.retain;
        }
        else if (typeof op.retain === 'object' && op.retain !== null) {
            return 1;
        }
        else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
        }
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.Op.length', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.