let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert', function(done) {
        // Test 1: Insert string without attributes
        let delta1 = new quill_delta();
        let result1 = delta1.insert('Hello');
        assert.strictEqual(result1, delta1, 'Should return the same delta instance');
        assert.strictEqual(delta1.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta1.ops[0].insert, 'Hello', 'Should insert the correct text');
        assert.strictEqual(delta1.ops[0].attributes, undefined, 'Should not have attributes');

        // Test 2: Insert string with attributes
        let delta2 = new quill_delta();
        let result2 = delta2.insert('World', { bold: true, italic: true });
        assert.strictEqual(result2, delta2, 'Should return the same delta instance');
        assert.strictEqual(delta2.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta2.ops[0].insert, 'World', 'Should insert the correct text');
        assert.deepStrictEqual(delta2.ops[0].attributes, { bold: true, italic: true }, 'Should have correct attributes');

        // Test 3: Insert empty string (should return without adding operation)
        let delta3 = new quill_delta();
        let result3 = delta3.insert('');
        assert.strictEqual(result3, delta3, 'Should return the same delta instance');
        assert.strictEqual(delta3.ops.length, 0, 'Should not add any operations for empty string');

        // Test 4: Insert with null attributes
        let delta4 = new quill_delta();
        let result4 = delta4.insert('Test', null);
        assert.strictEqual(result4, delta4, 'Should return the same delta instance');
        assert.strictEqual(delta4.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta4.ops[0].insert, 'Test', 'Should insert the correct text');
        assert.strictEqual(delta4.ops[0].attributes, undefined, 'Should not have attributes when null is passed');

        // Test 5: Insert with empty attributes object
        let delta5 = new quill_delta();
        let result5 = delta5.insert('Test', {});
        assert.strictEqual(result5, delta5, 'Should return the same delta instance');
        assert.strictEqual(delta5.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta5.ops[0].insert, 'Test', 'Should insert the correct text');
        assert.strictEqual(delta5.ops[0].attributes, undefined, 'Should not have attributes when empty object is passed');

        // Test 6: Insert non-string content (like embed)
        let delta6 = new quill_delta();
        let embedContent = { image: 'https://example.com/image.png' };
        let result6 = delta6.insert(embedContent, { width: '100px' });
        assert.strictEqual(result6, delta6, 'Should return the same delta instance');
        assert.strictEqual(delta6.ops.length, 1, 'Should have one operation');
        assert.deepStrictEqual(delta6.ops[0].insert, embedContent, 'Should insert the correct embed content');
        assert.deepStrictEqual(delta6.ops[0].attributes, { width: '100px' }, 'Should have correct attributes');

        // Test 7: Multiple inserts
        let delta7 = new quill_delta();
        delta7.insert('Hello').insert(' ').insert('World', { bold: true });
        assert.strictEqual(delta7.ops.length, 3, 'Should have three operations');
        assert.strictEqual(delta7.ops[0].insert, 'Hello', 'First operation should be correct');
        assert.strictEqual(delta7.ops[1].insert, ' ', 'Second operation should be correct');
        assert.strictEqual(delta7.ops[2].insert, 'World', 'Third operation should be correct');
        assert.deepStrictEqual(delta7.ops[2].attributes, { bold: true }, 'Third operation should have attributes');

        done();
    });
});