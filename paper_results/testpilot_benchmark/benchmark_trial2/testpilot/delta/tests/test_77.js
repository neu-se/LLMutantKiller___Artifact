let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
        // Test 1: Insert text without attributes
        const delta1 = new quill_delta();
        const result1 = delta1.insert('Hello');
        assert.strictEqual(result1.ops.length, 1);
        assert.strictEqual(result1.ops[0].insert, 'Hello');
        assert.strictEqual(result1.ops[0].attributes, undefined);

        // Test 2: Insert text with attributes
        const delta2 = new quill_delta();
        const result2 = delta2.insert('World', { bold: true, color: '#ccc' });
        assert.strictEqual(result2.ops.length, 1);
        assert.strictEqual(result2.ops[0].insert, 'World');
        assert.deepStrictEqual(result2.ops[0].attributes, { bold: true, color: '#ccc' });

        // Test 3: Insert empty string should return same delta
        const delta3 = new quill_delta();
        const result3 = delta3.insert('');
        assert.strictEqual(result3, delta3);
        assert.strictEqual(result3.ops.length, 0);

        // Test 4: Insert object (like image)
        const delta4 = new quill_delta();
        const imageObj = { image: 'https://example.com/image.png' };
        const result4 = delta4.insert(imageObj);
        assert.strictEqual(result4.ops.length, 1);
        assert.deepStrictEqual(result4.ops[0].insert, imageObj);
        assert.strictEqual(result4.ops[0].attributes, undefined);

        // Test 5: Insert with null attributes
        const delta5 = new quill_delta();
        const result5 = delta5.insert('Text', null);
        assert.strictEqual(result5.ops.length, 1);
        assert.strictEqual(result5.ops[0].insert, 'Text');
        assert.strictEqual(result5.ops[0].attributes, undefined);

        // Test 6: Insert with empty attributes object
        const delta6 = new quill_delta();
        const result6 = delta6.insert('Text', {});
        assert.strictEqual(result6.ops.length, 1);
        assert.strictEqual(result6.ops[0].insert, 'Text');
        assert.strictEqual(result6.ops[0].attributes, undefined);

        // Test 7: Insert with non-object attributes
        const delta7 = new quill_delta();
        const result7 = delta7.insert('Text', 'not-an-object');
        assert.strictEqual(result7.ops.length, 1);
        assert.strictEqual(result7.ops[0].insert, 'Text');
        assert.strictEqual(result7.ops[0].attributes, undefined);

        // Test 8: Chaining multiple inserts
        const delta8 = new quill_delta();
        const result8 = delta8.insert('Hello').insert(' ').insert('World', { bold: true });
        assert.strictEqual(result8.ops.length, 3);
        assert.strictEqual(result8.ops[0].insert, 'Hello');
        assert.strictEqual(result8.ops[1].insert, ' ');
        assert.strictEqual(result8.ops[2].insert, 'World');
        assert.deepStrictEqual(result8.ops[2].attributes, { bold: true });

        // Test 9: Insert returns the same delta instance (for chaining)
        const delta9 = new quill_delta();
        const result9 = delta9.insert('Test');
        assert.strictEqual(result9, delta9);

        done();
    });
});