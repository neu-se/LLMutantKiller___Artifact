Your task is to write a test for the following function:
```
quill-delta.prototype.filter(predicate)
```

You may use the following examples to guide your implementation:
```
// usage #1
const delta = new Delta().insert('Hello', { bold: true })                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })                         .insert('World!');const text = delta  .filter((op) => typeof op.insert === 'string')  .map((op) => op.insert)  .join('');
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.