Your task is to write a test for the following function:
```
quill-delta.prototype.insert(arg, attributes)
```

You may use the following examples to guide your implementation:
```
// usage #1
// Document with text "Gandalf the Grey"// with "Gandalf" bolded, and "Grey" in greyconst delta = new Delta([  { insert: 'Gandalf', attributes: { bold: true } },  { insert: ' the ' },  { insert: 'Grey', attributes: { color: '#ccc' } }]);// Change intended to be applied to above:// Keep the first 12 characters, insert a white 'White'// and delete the next four characters ('Grey')const death = new Delta().retain(12)                         .insert('White', { color: '#fff' })                         .delete(4);// {//   ops: [//     { retain: 12 },//     { insert: 'White', attributes: { color: '#fff' } },//     { delete: 4 }//   ]
// usage #2
const delta = new Delta([  { insert: 'Hello World' },  { insert: '!', attributes: { bold: true }}]);const packet = JSON.stringify(delta);const other = new Delta(JSON.parse(packet));const chained = new Delta().insert('Hello World').insert('!', { bold: true });
// usage #3
delta.insert('Text', { bold: true, color: '#ccc' });delta.insert({ image: 'https://octodex.github.com/images/labtocat.png' });
// usage #4
const a = new Delta().insert('Hello');const b = new Delta().insert('!', { bold: true });// {//   ops: [//     { insert: 'Hello' },//     { insert: '!', attributes: { bold: true } }//   ]// }const concat = a.concat(b);
// usage #5
const a = new Delta().insert('Hello');const b = new Delta().insert('Hello!');const diff = a.diff(b);  // { ops: [{ retain: 5 }, { insert: '!' }] }                         // a.compose(diff) == b
// usage #6
const delta = new Delta().insert('Hello\n\n')                         .insert('World')                         .insert({ image: 'octocat.png' })                         .insert('\n', { align: 'right' })                         .insert('!');delta.eachLine((line, attributes, i) => {  console.log(line, attributes, i);  // Can return false to exit loop early});// Should log:// { ops: [{ insert: 'Hello' }] }, {}, 0// { ops: [] }, {}, 1// { ops: [{ insert: 'World' }, { insert: { image: 'octocat.png' } }] }, { align: 'right' }, 2// { ops: [{ insert: '!' }] }, {}, 3
// usage #7
const base = new Delta().insert('Hello\n')                        .insert('World');const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);const inverted = delta.invert(base);  // { ops: [                                      //   { retain: 6, attributes: { bold: null } },                                      //   { insert: 'World' },                                      //   { delete: 1 }                                      // ]}                                      // base.compose(delta).compose(inverted) === base
// usage #8
const delta = new Delta().insert('Hello', { bold: true })                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })                         .insert('World!');const text = delta  .filter((op) => typeof op.insert === 'string')  .map((op) => op.insert)  .join('');
// usage #9
new Delta().insert('Hello').length();  // Returns 5new Delta().insert('A').retain(2).delete(1).length(); // Returns 4
// usage #10
const delta = new Delta().insert('Hello', { bold: true })                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })                         .insert('World!');const text = delta  .map((op) => {    if (typeof op.insert === 'string') {      return op.insert;    } else {      return '';    }  })  .join('');
// usage #11
const delta = new Delta().insert('Hello', { bold: true })                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })                         .insert('World!');const results = delta.partition((op) => typeof op.insert === 'string');const passed = results[0];  // [{ insert: 'Hello', attributes: { bold: true }},                            //  { insert: 'World'}]const failed = results[1];  // [{ insert: { image: 'https://octodex.github.com/images/labtocat.png' }}]
// usage #12
const delta = new Delta().insert('Hello', { bold: true })                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })                         .insert('World!');const length = delta.reduce((length, op) => (  length + (op.insert.length || 1);), 0);
// usage #13
const delta = new Delta().insert('Hello', { bold: true }).insert(' World');// {//   ops: [//     { insert: 'Hello', attributes: { bold: true } },//     { insert: ' World' }//   ]// }const copy = delta.slice();// { ops: [{ insert: 'World' }] }const world = delta.slice(6);// { ops: [{ insert: ' ' }] }const space = delta.slice(5, 6);
// usage #14
const a = new Delta().insert('abc');const b = new Delta().retain(1).delete(1);const composed = a.compose(b);  // composed == new Delta().insert('ac');
// usage #15
const a = new Delta().insert('a');const b = new Delta().insert('b').retain(5).insert('c');a.transform(b, true);  // new Delta().retain(1).insert('b').retain(5).insert('c');a.transform(b, false); // new Delta().insert('b').retain(6).insert('c');
// usage #16
const delta = new Delta().retain(5).insert('a');delta.transformPosition(4); // 4delta.transformPosition(5); // 6
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.