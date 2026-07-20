Your task is to write a test for the following function:
```
quill-delta.prototype.eachLine(predicate, newline = '\n')
```

This function is defined as follows:
```
eachLine(predicate, newline = '\n') {
        const iter = new OpIterator_1.default(this.ops);
        let line = new Delta();
        let i = 0;
        while (iter.hasNext()) {
            if (iter.peekType() !== 'insert') {
                return;
            }
            const thisOp = iter.peek();
            const start = Op_1.default.length(thisOp) - iter.peekLength();
            const index = typeof thisOp.insert === 'string'
                ? thisOp.insert.indexOf(newline, start) - start
                : -1;
            if (index < 0) {
                line.push(iter.next());
            }
            else if (index > 0) {
                line.push(iter.next(index));
            }
            else {
                if (predicate(line, iter.next(1).attributes || {}, i) === false) {
                    return;
                }
                i += 1;
                line = new Delta();
            }
        }
        if (line.length() > 0) {
            predicate(line, {}, i);
        }
    }
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