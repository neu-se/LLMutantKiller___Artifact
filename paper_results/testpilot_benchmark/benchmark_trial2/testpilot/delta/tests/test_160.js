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
        assert.deepEqual(composed.ops, expected.ops, 'Should compose basic text insertion');

        // Test 2: Text deletion composition
        const c = new Delta().insert('abc');
        const d = new Delta().retain(1).delete(1);
        const composed2 = c.compose(d);
        const expected2 = new Delta().insert('ac');
        assert.deepEqual(composed2.ops, expected2.ops, 'Should compose text deletion correctly');

        // Test 3: Complex composition with attributes
        const base = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta().retain(12)
                                 .insert('White', { color: '#fff' })
                                 .delete(4);
        const composed3 = base.compose(change);
        const expected3 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(composed3.ops, expected3.ops, 'Should compose complex operations with attributes');

        // Test 4: Attribute modification
        const text = new Delta().insert('Hello\nWorld');
        const formatting = new Delta().retain(6).retain(5, { bold: true });
        const composed4 = text.compose(formatting);
        const expected4 = new Delta().insert('Hello\n').insert('World', { bold: true });
        assert.deepEqual(composed4.ops, expected4.ops, 'Should compose attribute changes');

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text5 = new Delta().insert('test');
        const composed5 = empty.compose(text5);
        assert.deepEqual(composed5.ops, text5.ops, 'Should compose with empty delta');

        // Test 6: Multiple operations
        const multi1 = new Delta().insert('abc').insert('def');
        const multi2 = new Delta().retain(3).delete(1).insert('X');
        const composed6 = multi1.compose(multi2);
        const expected6 = new Delta().insert('abcXef');
        assert.deepEqual(composed6.ops, expected6.ops, 'Should compose multiple operations');

        done();
    });
});