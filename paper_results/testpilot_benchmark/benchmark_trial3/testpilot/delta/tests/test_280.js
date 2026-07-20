let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
        // Test 1: Insert string without attributes
        const delta1 = new quill_delta().insert('Hello');
        assert.equal(delta1.ops.length, 1);
        assert.equal(delta1.ops[0].insert, 'Hello');
        assert.equal(delta1.ops[0].attributes, undefined);

        // Test 2: Insert string with attributes
        const delta2 = new quill_delta().insert('World', { bold: true, color: '#ccc' });
        assert.equal(delta2.ops.length, 1);
        assert.equal(delta2.ops[0].insert, 'World');
        assert.deepEqual(delta2.ops[0].attributes, { bold: true, color: '#ccc' });

        // Test 3: Insert empty string should return same delta (no operation added)
        const delta3 = new quill_delta().insert('test');
        const originalLength = delta3.ops.length;
        const result = delta3.insert('');
        assert.equal(result.ops.length, originalLength);
        assert.equal(result, delta3); // Should return same instance

        // Test 4: Insert object (embed) without attributes
        const delta4 = new quill_delta().insert({ image: 'https://example.com/image.png' });
        assert.equal(delta4.ops.length, 1);
        assert.deepEqual(delta4.ops[0].insert, { image: 'https://example.com/image.png' });
        assert.equal(delta4.ops[0].attributes, undefined);

        // Test 5: Insert object (embed) with attributes
        const delta5 = new quill_delta().insert({ image: 'test.png' }, { align: 'center' });
        assert.equal(delta5.ops.length, 1);
        assert.deepEqual(delta5.ops[0].insert, { image: 'test.png' });
        assert.deepEqual(delta5.ops[0].attributes, { align: 'center' });

        // Test 6: Chain multiple inserts
        const delta6 = new quill_delta()
            .insert('Hello')
            .insert(' ')
            .insert('World', { bold: true });
        assert.equal(delta6.ops.length, 3);
        assert.equal(delta6.ops[0].insert, 'Hello');
        assert.equal(delta6.ops[1].insert, ' ');
        assert.equal(delta6.ops[2].insert, 'World');
        assert.deepEqual(delta6.ops[2].attributes, { bold: true });

        // Test 7: Insert with null attributes should not add attributes property
        const delta7 = new quill_delta().insert('test', null);
        assert.equal(delta7.ops.length, 1);
        assert.equal(delta7.ops[0].insert, 'test');
        assert.equal(delta7.ops[0].attributes, undefined);

        // Test 8: Insert with empty attributes object should not add attributes property
        const delta8 = new quill_delta().insert('test', {});
        assert.equal(delta8.ops.length, 1);
        assert.equal(delta8.ops[0].insert, 'test');
        assert.equal(delta8.ops[0].attributes, undefined);

        // Test 9: Insert with undefined attributes should not add attributes property
        const delta9 = new quill_delta().insert('test', undefined);
        assert.equal(delta9.ops.length, 1);
        assert.equal(delta9.ops[0].insert, 'test');
        assert.equal(delta9.ops[0].attributes, undefined);

        // Test 10: Insert returns the delta instance for chaining
        const delta10 = new quill_delta();
        const result10 = delta10.insert('test');
        assert.equal(result10, delta10);

        done();
    });
});