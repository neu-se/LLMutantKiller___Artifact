Your task is to write a test for the following function:
```
quill-delta.prototype.eachLine(predicate, newline = '\n')
```

You may use the following examples to guide your implementation:
```
// usage #1
const delta = new Delta().insert('Hello\n\n')                         .insert('World')                         .insert({ image: 'octocat.png' })                         .insert('\n', { align: 'right' })                         .insert('!');delta.eachLine((line, attributes, i) => {  console.log(line, attributes, i);  // Can return false to exit loop early});// Should log:// { ops: [{ insert: 'Hello' }] }, {}, 0// { ops: [] }, {}, 1// { ops: [{ insert: 'World' }, { insert: { image: 'octocat.png' } }] }, { align: 'right' }, 2// { ops: [{ insert: '!' }] }, {}, 3
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.