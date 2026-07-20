let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic composition with text insertion and deletion
        const a = new Delta().insert('abc');
        const b = new Delta().retain(1).delete(1);
        const composed = a.compose(b);
        const expected = new Delta().insert('ac');
        assert.deepEqual(composed.ops, expected.ops, 'Basic compose should work');

        // Test 2: Composition with attributes
        const delta = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta().retain(12)
                                 .insert('White', { color: '#fff' })
                                 .delete(4);
        const result = delta.compose(change);
        const expectedResult = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(result.ops, expectedResult.ops, 'Compose with attributes should work');

        // Test 3: Composition that results in identity (diff and compose)
        const hello = new Delta().insert('Hello');
        const helloExclaim = new Delta().insert('Hello!');
        const diff = hello.diff(helloExclaim);
        const composed2 = hello.compose(diff);
        assert.deepEqual(composed2.ops, helloExclaim.ops, 'Compose with diff should recreate target');

        // Test 4: Complex composition with retain, insert, and delete
        const base = new Delta().insert('Hello\n').insert('World');
        const delta2 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const composed3 = base.compose(delta2);
        const expected3 = new Delta().insert('Hello\n', { bold: true }).insert('!');
        assert.deepEqual(composed3.ops, expected3.ops, 'Complex compose should work');

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text = new Delta().insert('test');
        const composed4 = empty.compose(text);
        assert.deepEqual(composed4.ops, text.ops, 'Composing with empty delta should return the other delta');

        // Test 6: Composition with only retains
        const original = new Delta().insert('Hello World');
        const retainOnly = new Delta().retain(11);
        const composed5 = original.compose(retainOnly);
        assert.deepEqual(composed5.ops, original.ops, 'Composing with retain-only delta should preserve original');

        done();
    });
});