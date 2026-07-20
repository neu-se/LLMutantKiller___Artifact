Your task is to write a test for the following function:
```
quill-delta.prototype.slice(start = 0, end = Infinity)
```

You may use the following examples to guide your implementation:
```
// usage #1
const delta = new Delta().insert('Hello', { bold: true }).insert(' World');// {//   ops: [//     { insert: 'Hello', attributes: { bold: true } },//     { insert: ' World' }//   ]// }const copy = delta.slice();// { ops: [{ insert: 'World' }] }const world = delta.slice(6);// { ops: [{ insert: ' ' }] }const space = delta.slice(5, 6);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.