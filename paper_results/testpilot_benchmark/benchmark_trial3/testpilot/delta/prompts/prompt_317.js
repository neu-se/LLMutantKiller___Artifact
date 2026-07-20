Your task is to write a test for the following function:
```
quill-delta.prototype.length()
```

This function is defined as follows:
```
length() {
        return this.reduce((length, elem) => {
            return length + Op_1.default.length(elem);
        }, 0);
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
new Delta().insert('Hello').length();  // Returns 5new Delta().insert('A').retain(2).delete(1).length(); // Returns 4
// usage #2
new Delta().insert('Hello').length();  // Returns 5new Delta().insert('A').retain(2).delete(1).length(); // Returns 4
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.length', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.