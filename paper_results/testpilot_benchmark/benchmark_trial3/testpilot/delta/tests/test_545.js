let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic composition with retain, insert, and delete
        const delta1 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change1 = new Delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        
        const result1 = delta1.compose(change1);
        const expected1 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(result1.ops, expected1.ops);

        // Test 2: Simple insert composition
        const a = new Delta().insert('Hello');
        const b = new Delta().insert('Hello!');
        const diff = a.diff(b);
        const composed = a.compose(diff);
        assert.deepEqual(composed.ops, b.ops);

        // Test 3: Retain and delete composition
        const base = new Delta().insert('abc');
        const change = new Delta().retain(1).delete(1);
        const result3 = base.compose(change);
        const expected3 = new Delta().insert('ac');
        assert.deepEqual(result3.ops, expected3.ops);

        // Test 4: Complex composition with attributes and operations
        const base4 = new Delta().insert('Hello\n').insert('World');
        const delta4 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const result4 = base4.compose(delta4);
        const expected4 = new Delta()
            .insert('Hello\n')
            .insert('!', { bold: true });
        assert.deepEqual(result4.ops, expected4.ops);

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text = new Delta().insert('test');
        const result5 = empty.compose(text);
        assert.deepEqual(result5.ops, text.ops);

        // Test 6: Composition with only retains
        const base6 = new Delta().insert('Hello World');
        const change6 = new Delta().retain(5, { bold: true }).retain(6);
        const result6 = base6.compose(change6);
        const expected6 = new Delta()
            .insert('Hello', { bold: true })
            .insert(' World');
        assert.deepEqual(result6.ops, expected6.ops);

        done();
    });
});