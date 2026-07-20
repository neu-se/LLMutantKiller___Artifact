let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete', function(done) {
        // Test 1: Basic delete operation
        const delta1 = new quill_delta().insert('Hello World').delete(5);
        assert.equal(delta1.ops.length, 2);
        assert.deepEqual(delta1.ops[0], { insert: 'Hello World' });
        assert.deepEqual(delta1.ops[1], { delete: 5 });

        // Test 2: Delete operation in a chain (similar to usage #1)
        const delta2 = new quill_delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        assert.equal(delta2.ops.length, 3);
        assert.deepEqual(delta2.ops[0], { retain: 12 });
        assert.deepEqual(delta2.ops[1], { insert: 'White', attributes: { color: '#fff' } });
        assert.deepEqual(delta2.ops[2], { delete: 4 });

        // Test 3: Delete operation with retain and insert (similar to usage #2)
        const delta3 = new quill_delta()
            .retain(6, { bold: true })
            .insert('!')
            .delete(5);
        assert.equal(delta3.ops.length, 3);
        assert.deepEqual(delta3.ops[0], { retain: 6, attributes: { bold: true } });
        assert.deepEqual(delta3.ops[1], { insert: '!' });
        assert.deepEqual(delta3.ops[2], { delete: 5 });

        // Test 4: Delete zero length (edge case)
        const delta4 = new quill_delta().insert('test').delete(0);
        assert.equal(delta4.ops.length, 1);
        assert.deepEqual(delta4.ops[0], { insert: 'test' });

        // Test 5: Multiple delete operations
        const delta5 = new quill_delta()
            .insert('abc')
            .delete(1)
            .insert('def')
            .delete(2);
        assert.equal(delta5.ops.length, 4);
        assert.deepEqual(delta5.ops[0], { insert: 'abc' });
        assert.deepEqual(delta5.ops[1], { delete: 1 });
        assert.deepEqual(delta5.ops[2], { insert: 'def' });
        assert.deepEqual(delta5.ops[3], { delete: 2 });

        // Test 6: Delete operation affects length calculation
        const delta6 = new quill_delta().insert('A').retain(2).delete(1);
        assert.equal(delta6.length(), 3); // 2 (retain) + 1 (delete) = 3

        done();
    });
});