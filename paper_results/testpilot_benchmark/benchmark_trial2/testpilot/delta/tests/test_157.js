let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic text insertion composition
        const a = new Delta().insert('Hello');
        const b = new Delta().retain(5).insert('!');
        const composed = a.compose(b);
        const expected = new Delta().insert('Hello!');
        assert.deepEqual(composed.ops, expected.ops, 'Basic insertion should work');

        // Test 2: Insert and delete composition
        const c = new Delta().insert('abc');
        const d = new Delta().retain(1).delete(1);
        const composed2 = c.compose(d);
        const expected2 = new Delta().insert('ac');
        assert.deepEqual(composed2.ops, expected2.ops, 'Insert and delete should work');

        // Test 3: Composition with attributes
        const base = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta().retain(12).insert('White', { color: '#fff' }).delete(4);
        const composed3 = base.compose(change);
        const expected3 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(composed3.ops, expected3.ops, 'Composition with attributes should work');

        // Test 4: Retain with attributes
        const base2 = new Delta().insert('Hello\nWorld');
        const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const composed4 = base2.compose(delta);
        const expected4 = new Delta().insert('Hello\n', { bold: true }).insert('!');
        assert.deepEqual(composed4.ops, expected4.ops, 'Retain with attributes should work');

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text = new Delta().insert('test');
        const composed5 = empty.compose(text);
        assert.deepEqual(composed5.ops, text.ops, 'Composing with empty delta should return the other delta');

        // Test 6: Multiple operations
        const multi1 = new Delta().insert('abc').insert('def');
        const multi2 = new Delta().retain(3).delete(1).insert('X').retain(2);
        const composed6 = multi1.compose(multi2);
        const expected6 = new Delta().insert('abcXef');
        assert.deepEqual(composed6.ops, expected6.ops, 'Multiple operations should compose correctly');

        // Test 7: Only retains
        const retain1 = new Delta().insert('hello world');
        const retain2 = new Delta().retain(11);
        const composed7 = retain1.compose(retain2);
        assert.deepEqual(composed7.ops, retain1.ops, 'Composing with only retains should preserve original');

        done();
    });
});