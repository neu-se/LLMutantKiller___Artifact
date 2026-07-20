Your task is to write a test for the following function:
```
quill-delta.AttributeMap.compose(a = {}, b = {}, keepNull = false)
```

This function is defined as follows:
```
function compose(a = {}, b = {}, keepNull = false) {
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        let attributes = cloneDeep(b);
        if (!keepNull) {
            attributes = Object.keys(attributes).reduce((copy, key) => {
                if (attributes[key] != null) {
                    copy[key] = attributes[key];
                }
                return copy;
            }, {});
        }
        for (const key in a) {
            if (a[key] !== undefined && b[key] === undefined) {
                attributes[key] = a[key];
            }
        }
        return Object.keys(attributes).length > 0 ? attributes : undefined;
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
    it('test quill-delta.AttributeMap.compose', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.