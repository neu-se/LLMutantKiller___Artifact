let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
        // Test 1: Insert string without attributes
        const delta1 = new quill_delta();
        const result1 = delta1.insert('Hello');
        assert.strictEqual(result1, delta1, 'insert should return the same delta instance');
        assert.deepStrictEqual(delta1.ops, [{ insert: 'Hello' }], 'should insert string without attributes');

        // Test 2: Insert string with attributes
        const delta2 = new quill_delta();
        delta2.insert('World', { bold: true, color: '#ccc' });
        assert.deepStrictEqual(delta2.ops, [{ insert: 'World', attributes: { bold: true, color: '#ccc' } }], 'should insert string with attributes');

        // Test 3: Insert empty string (should return without adding operation)
        const delta3 = new quill_delta().insert('Hello');
        const originalOps = [...delta3.ops];
        const result3 = delta3.insert('');
        assert.strictEqual(result3, delta3, 'insert empty string should return the same delta instance');
        assert.deepStrictEqual(delta3.ops, originalOps, 'insert empty string should not modify ops');

        // Test 4: Insert object (embed) without attributes
        const delta4 = new quill_delta();
        delta4.insert({ image: 'https://example.com/image.png' });
        assert.deepStrictEqual(delta4.ops, [{ insert: { image: 'https://example.com/image.png' } }], 'should insert object without attributes');

        // Test 5: Insert object (embed) with attributes
        const delta5 = new quill_delta();
        delta5.insert({ image: 'https://example.com/image.png' }, { align: 'center' });
        assert.deepStrictEqual(delta5.ops, [{ insert: { image: 'https://example.com/image.png' }, attributes: { align: 'center' } }], 'should insert object with attributes');

        // Test 6: Insert with null attributes (should not add attributes)
        const delta6 = new quill_delta();
        delta6.insert('Test', null);
        assert.deepStrictEqual(delta6.ops, [{ insert: 'Test' }], 'should insert without attributes when attributes is null');

        // Test 7: Insert with empty attributes object (should not add attributes)
        const delta7 = new quill_delta();
        delta7.insert('Test', {});
        assert.deepStrictEqual(delta7.ops, [{ insert: 'Test' }], 'should insert without attributes when attributes is empty object');

        // Test 8: Insert with undefined attributes (should not add attributes)
        const delta8 = new quill_delta();
        delta8.insert('Test', undefined);
        assert.deepStrictEqual(delta8.ops, [{ insert: 'Test' }], 'should insert without attributes when attributes is undefined');

        // Test 9: Chain multiple inserts
        const delta9 = new quill_delta()
            .insert('Hello')
            .insert(' ')
            .insert('World', { bold: true });
        assert.deepStrictEqual(delta9.ops, [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ], 'should support chaining multiple inserts');

        // Test 10: Insert with non-object attributes (should not add attributes)
        const delta10 = new quill_delta();
        delta10.insert('Test', 'invalid');
        assert.deepStrictEqual(delta10.ops, [{ insert: 'Test' }], 'should insert without attributes when attributes is not an object');

        done();
    });
});