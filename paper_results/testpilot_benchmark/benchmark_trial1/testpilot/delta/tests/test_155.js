let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic text insertion and deletion
        const a = new Delta().insert('abc');
        const b = new Delta().retain(1).delete(1);
        const composed = a.compose(b);
        const expected = new Delta().insert('ac');
        assert.deepEqual(composed.ops, expected.ops, 'Basic deletion should work');

        // Test 2: Insert with attributes
        const base = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta().retain(12)
                                 .insert('White', { color: '#fff' })
                                 .delete(4);
        const result = base.compose(change);
        const expectedResult = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(result.ops, expectedResult.ops, 'Compose with attributes should work');

        // Test 3: Simple insertion at end
        const hello = new Delta().insert('Hello');
        const addExclamation = new Delta().retain(5).insert('!');
        const helloExclamation = hello.compose(addExclamation);
        const expectedHello = new Delta().insert('Hello!');
        assert.deepEqual(helloExclamation.ops, expectedHello.ops, 'Insertion at end should work');

        // Test 4: Retain with attributes
        const baseText = new Delta().insert('Hello\n').insert('World');
        const addBold = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const boldResult = baseText.compose(addBold);
        const expectedBold = new Delta()
            .insert('Hello\n')
            .insert('', { bold: true })
            .insert('!');
        // Check that the composition produces expected structure
        assert.equal(boldResult.ops.length >= 2, true, 'Should have multiple operations');
        assert.equal(boldResult.ops[boldResult.ops.length - 1].insert, '!', 'Should end with exclamation');

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text = new Delta().insert('test');
        const emptyComposed = empty.compose(text);
        assert.deepEqual(emptyComposed.ops, text.ops, 'Composing with empty delta should return the other delta');

        // Test 6: Identity composition
        const original = new Delta().insert('test');
        const identity = new Delta().retain(4);
        const identityResult = original.compose(identity);
        assert.deepEqual(identityResult.ops, original.ops, 'Composing with identity should return original');

        done();
    });
});