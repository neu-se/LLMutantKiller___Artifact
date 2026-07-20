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

        // Test 3: Insert empty string should return without adding operation
        let delta3 = new quill_delta();
        let result3 = delta3.insert('');
        assert.strictEqual(result3, delta3, 'Should return the same delta instance');
        assert.strictEqual(delta3.ops.length, 0, 'Should not add any operations for empty string');

        // Test 4: Insert non-string (embed) without attributes
        let delta4 = new quill_delta();
        let embed = { image: 'https://example.com/image.png' };
        let result4 = delta4.insert(embed);
        assert.strictEqual(result4, delta4, 'Should return the same delta instance');
        assert.strictEqual(delta4.ops.length, 1, 'Should have one operation');
        assert.deepStrictEqual(delta4.ops[0].insert, embed, 'Should insert the correct embed');
        assert.strictEqual(delta4.ops[0].attributes, undefined, 'Should not have attributes');

        // Test 5: Insert with null attributes
        let delta5 = new quill_delta();
        let result5 = delta5.insert('Test', null);
        assert.strictEqual(result5, delta5, 'Should return the same delta instance');
        assert.strictEqual(delta5.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta5.ops[0].insert, 'Test', 'Should insert the correct text');
        assert.strictEqual(delta5.ops[0].attributes, undefined, 'Should not have attributes when null is passed');

        // Test 6: Insert with empty attributes object
        let delta6 = new quill_delta();
        let result6 = delta6.insert('Test', {});
        assert.strictEqual(result6, delta6, 'Should return the same delta instance');
        assert.strictEqual(delta6.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta6.ops[0].insert, 'Test', 'Should insert the correct text');
        assert.strictEqual(delta6.ops[0].attributes, undefined, 'Should not have attributes when empty object is passed');

        // Test 7: Insert with non-object attributes
        let delta7 = new quill_delta();
        let result7 = delta7.insert('Test', 'not-an-object');
        assert.strictEqual(result7, delta7, 'Should return the same delta instance');
        assert.strictEqual(delta7.ops.length, 1, 'Should have one operation');
        assert.strictEqual(delta7.ops[0].insert, 'Test', 'Should insert the correct text');
        assert.strictEqual(delta7.ops[0].attributes, undefined, 'Should not have attributes when non-object is passed');

        done();
    });
});