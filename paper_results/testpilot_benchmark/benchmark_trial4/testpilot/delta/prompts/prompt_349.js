Your task is to write a test for the following function:
```
quill-delta.prototype.compose(other)
```

This function is defined as follows:
```
compose(other) {
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        const ops = [];
        const firstOther = otherIter.peek();
        if (firstOther != null &&
            typeof firstOther.retain === 'number' &&
            firstOther.attributes == null) {
            let firstLeft = firstOther.retain;
            while (thisIter.peekType() === 'insert' &&
                thisIter.peekLength() <= firstLeft) {
                firstLeft -= thisIter.peekLength();
                ops.push(thisIter.next());
            }
            if (firstOther.retain - firstLeft > 0) {
                otherIter.next(firstOther.retain - firstLeft);
            }
        }
        const delta = new Delta(ops);
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else if (thisIter.peekType() === 'delete') {
                delta.push(thisIter.next());
            }
            else {
                const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
                const thisOp = thisIter.next(length);
                const otherOp = otherIter.next(length);
                if (otherOp.retain) {
                    const newOp = {};
                    if (typeof thisOp.retain === 'number') {
                        newOp.retain =
                            typeof otherOp.retain === 'number' ? length : otherOp.retain;
                    }
                    else {
                        if (typeof otherOp.retain === 'number') {
                            if (thisOp.retain == null) {
                                newOp.insert = thisOp.insert;
                            }
                            else {
                                newOp.retain = thisOp.retain;
                            }
                        }
                        else {
                            const action = thisOp.retain == null ? 'insert' : 'retain';
                            const [embedType, thisData, otherData] = getEmbedTypeAndData(thisOp[action], otherOp.retain);
                            const handler = Delta.getHandler(embedType);
                            newOp[action] = {
                                [embedType]: handler.compose(thisData, otherData, action === 'retain'),
                            };
                        }
                    }
                    // Preserve null when composing with a retain, otherwise remove it for inserts
                    const attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
                    if (attributes) {
                        newOp.attributes = attributes;
                    }
                    delta.push(newOp);
                    // Optimization if rest of other is just retain
                    if (!otherIter.hasNext() &&
                        isEqual(delta.ops[delta.ops.length - 1], newOp)) {
                        const rest = new Delta(thisIter.rest());
                        return delta.concat(rest).chop();
                    }
                    // Other op should be delete, we could be an insert or retain
                    // Insert + delete cancels out
                }
                else if (typeof otherOp.delete === 'number' &&
                    (typeof thisOp.retain === 'number' ||
                        (typeof thisOp.retain === 'object' && thisOp.retain !== null))) {
                    delta.push(otherOp);
                }
            }
        }
        return delta.chop();
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
// Document with text "Gandalf the Grey"// with "Gandalf" bolded, and "Grey" in greyconst delta = new Delta([  { insert: 'Gandalf', attributes: { bold: true } },  { insert: ' the ' },  { insert: 'Grey', attributes: { color: '#ccc' } }]);// Change intended to be applied to above:// Keep the first 12 characters, insert a white 'White'// and delete the next four characters ('Grey')const death = new Delta().retain(12)                         .insert('White', { color: '#fff' })                         .delete(4);// {//   ops: [//     { retain: 12 },//     { insert: 'White', attributes: { color: '#fff' } },//     { delete: 4 }//   ]
// usage #2
const a = new Delta().insert('Hello');const b = new Delta().insert('Hello!');const diff = a.diff(b);  // { ops: [{ retain: 5 }, { insert: '!' }] }                         // a.compose(diff) == b
// usage #3
const a = new Delta().insert('Hello');const b = new Delta().insert('Hello!');const diff = a.diff(b);  // { ops: [{ retain: 5 }, { insert: '!' }] }                         // a.compose(diff) == b
// usage #4
const base = new Delta().insert('Hello\n')                        .insert('World');const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);const inverted = delta.invert(base);  // { ops: [                                      //   { retain: 6, attributes: { bold: null } },                                      //   { insert: 'World' },                                      //   { delete: 1 }                                      // ]}                                      // base.compose(delta).compose(inverted) === base
// usage #5
const base = new Delta().insert('Hello\n')                        .insert('World');const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);const inverted = delta.invert(base);  // { ops: [                                      //   { retain: 6, attributes: { bold: null } },                                      //   { insert: 'World' },                                      //   { delete: 1 }                                      // ]}                                      // base.compose(delta).compose(inverted) === base
// usage #6
const a = new Delta().insert('abc');const b = new Delta().retain(1).delete(1);const composed = a.compose(b);  // composed == new Delta().insert('ac');
// usage #7
const a = new Delta().insert('abc');const b = new Delta().retain(1).delete(1);const composed = a.compose(b);  // composed == new Delta().insert('ac');
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.