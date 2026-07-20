let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
        // Test 1: Insert plain text without attributes
        const delta1 = new quill_delta();
        delta1.insert('Hello World');
        assert.deepEqual(delta1.ops, [{ insert: 'Hello World' }]);

        // Test 2: Insert text with attributes
        const delta2 = new quill_delta();
        delta2.insert('Bold Text', { bold: true });
        assert.deepEqual(delta2.ops, [{ insert: 'Bold Text', attributes: { bold: true } }]);

        // Test 3: Insert text with multiple attributes
        const delta3 = new quill_delta();
        delta3.insert('Styled Text', { bold: true, color: '#ccc' });
        assert.deepEqual(delta3.ops, [{ insert: 'Styled Text', attributes: { bold: true, color: '#ccc' } }]);

        // Test 4: Insert embed (image) without attributes
        const delta4 = new quill_delta();
        delta4.insert({ image: 'https://example.com/image.png' });
        assert.deepEqual(delta4.ops, [{ insert: { image: 'https://example.com/image.png' } }]);

        // Test 5: Insert embed with attributes
        const delta5 = new quill_delta();
        delta5.insert({ image: 'https://example.com/image.png' }, { width: '100px' });
        assert.deepEqual(delta5.ops, [{ insert: { image: 'https://example.com/image.png' }, attributes: { width: '100px' } }]);

        // Test 6: Chain multiple inserts
        const delta6 = new quill_delta();
        delta6.insert('Hello').insert(' ').insert('World', { bold: true });
        assert.deepEqual(delta6.ops, [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ]);

        // Test 7: Insert with null/undefined attributes should not include attributes
        const delta7 = new quill_delta();
        delta7.insert('Plain Text', null);
        assert.deepEqual(delta7.ops, [{ insert: 'Plain Text' }]);

        const delta8 = new quill_delta();
        delta8.insert('Plain Text', undefined);
        assert.deepEqual(delta8.ops, [{ insert: 'Plain Text' }]);

        // Test 8: Insert empty string
        const delta9 = new quill_delta();
        delta9.insert('');
        assert.deepEqual(delta9.ops, []);

        // Test 9: Verify method chaining returns the delta instance
        const delta10 = new quill_delta();
        const result = delta10.insert('Test');
        assert.strictEqual(result, delta10);

        done();
    });
});