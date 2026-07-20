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
        const a2 = new Delta().insert('Hello');
        const b2 = new Delta().retain(5).insert('!');
        const result2 = a2.compose(b2);
        const expected2 = new Delta().insert('Hello!');
        assert.deepEqual(result2.ops, expected2.ops);

        // Test 3: Delete operation
        const a3 = new Delta().insert('abc');
        const b3 = new Delta().retain(1).delete(1);
        const result3 = a3.compose(b3);
        const expected3 = new Delta().insert('ac');
        assert.deepEqual(result3.ops, expected3.ops);

        // Test 4: Attribute modification
        const a4 = new Delta().insert('Hello\n').insert('World');
        const b4 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const result4 = a4.compose(b4);
        const expected4 = new Delta()
            .insert('Hello\n')
            .insert('!', { bold: true });
        assert.deepEqual(result4.ops, expected4.ops);

        // Test 5: Empty delta composition
        const a5 = new Delta().insert('test');
        const b5 = new Delta();
        const result5 = a5.compose(b5);
        assert.deepEqual(result5.ops, a5.ops);

        // Test 6: Multiple operations
        const a6 = new Delta().insert('Hello World');
        const b6 = new Delta()
            .retain(5)
            .delete(1)
            .insert(' Beautiful')
            .retain(5);
        const result6 = a6.compose(b6);
        const expected6 = new Delta().insert('Hello Beautiful World');
        assert.deepEqual(result6.ops, expected6.ops);

        done();
    });
});