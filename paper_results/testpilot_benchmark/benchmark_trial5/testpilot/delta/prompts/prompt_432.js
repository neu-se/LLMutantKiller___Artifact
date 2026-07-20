Your task is to write a test for the following function:
```
quill-delta.prototype.invert(base)
```

You may use the following examples to guide your implementation:
```
// usage #1
const base = new Delta().insert('Hello\n')                        .insert('World');const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);const inverted = delta.invert(base);  // { ops: [                                      //   { retain: 6, attributes: { bold: null } },                                      //   { insert: 'World' },                                      //   { delete: 1 }                                      // ]}                                      // base.compose(delta).compose(inverted) === base
// usage #2
const base = new Delta().insert('Hello\n')                        .insert('World');const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);const inverted = delta.invert(base);  // { ops: [                                      //   { retain: 6, attributes: { bold: null } },                                      //   { insert: 'World' },                                      //   { delete: 1 }                                      // ]}                                      // base.compose(delta).compose(inverted) === base
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.