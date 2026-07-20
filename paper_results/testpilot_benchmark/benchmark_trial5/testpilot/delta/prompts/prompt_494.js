Your task is to write a test for the following function:
```
quill-delta.getHandler(embedType)
```

This function is defined as follows:
```
getHandler(embedType) {
        const handler = this.handlers[embedType];
        if (!handler) {
            throw new Error(`no handlers for embed type "${embedType}"`);
        }
        return handler;
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.getHandler', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.