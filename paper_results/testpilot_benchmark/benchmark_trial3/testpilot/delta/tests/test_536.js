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
        const e = new Delta().insert('Hello\nWorld');
        const f = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const composed4 = e.compose(f);
        const expected4 = new Delta().insert('Hello\n', { bold: true }).insert('!');
        assert.deepEqual(composed4.ops, expected4.ops, 'Retain with attributes should work');

        // Test 5: Empty delta composition
        const empty1 = new Delta();
        const empty2 = new Delta();
        const composed5 = empty1.compose(empty2);
        assert.deepEqual(composed5.ops, [], 'Empty deltas should compose to empty');

        // Test 6: Only retains
        const g = new Delta().insert('test');
        const h = new Delta().retain(4);
        const composed6 = g.compose(h);
        const expected6 = new Delta().insert('test');
        assert.deepEqual(composed6.ops, expected6.ops, 'Retain-only composition should preserve original');

        // Test 7: Multiple operations
        const i = new Delta().insert('Hello World');
        const j = new Delta().retain(5).delete(1).insert(' Beautiful').retain(5);
        const composed7 = i.compose(j);
        const expected7 = new Delta().insert('Hello Beautiful World');
        assert.deepEqual(composed7.ops, expected7.ops, 'Multiple operations should compose correctly');

        done();
    });
});