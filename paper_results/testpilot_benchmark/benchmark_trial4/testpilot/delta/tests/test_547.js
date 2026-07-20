let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic text insertion composition
        const a = new Delta().insert('Hello');
        const b = new Delta().retain(5).insert('!');
        const composed = a.compose(b);
        const expected = new Delta().insert('Hello!');
        assert.deepEqual(composed.ops, expected.ops);

        // Test 2: Insert and delete composition
        const c = new Delta().insert('abc');
        const d = new Delta().retain(1).delete(1);
        const composed2 = c.compose(d);
        const expected2 = new Delta().insert('ac');
        assert.deepEqual(composed2.ops, expected2.ops);

        // Test 3: Composition with attributes
        const base = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        const composed3 = base.compose(change);
        const expected3 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(composed3.ops, expected3.ops);

        // Test 4: Retain with attributes
        const e = new Delta().insert('Hello World');
        const f = new Delta().retain(6, { bold: true }).retain(5);
        const composed4 = e.compose(f);
        const expected4 = new Delta()
            .insert('Hello ', { bold: true })
            .insert('World');
        assert.deepEqual(composed4.ops, expected4.ops);

        // Test 5: Multiple operations
        const g = new Delta().insert('ABC').insert('DEF');
        const h = new Delta().retain(2).delete(2).insert('XY');
        const composed5 = g.compose(h);
        const expected5 = new Delta().insert('AXYEF');
        assert.deepEqual(composed5.ops, expected5.ops);

        // Test 6: Empty delta composition
        const i = new Delta().insert('test');
        const j = new Delta();
        const composed6 = i.compose(j);
        assert.deepEqual(composed6.ops, i.ops);

        // Test 7: Delete all content
        const k = new Delta().insert('Hello');
        const l = new Delta().delete(5);
        const composed7 = k.compose(l);
        const expected7 = new Delta();
        assert.deepEqual(composed7.ops, expected7.ops);

        done();
    });
});