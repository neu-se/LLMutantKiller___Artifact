let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform', function(done) {
        // Test 1: Transform with no conflicting attributes
        const attrs1 = { bold: true };
        const attrs2 = { italic: true };
        const result1 = quill_delta.AttributeMap.transform(attrs1, attrs2, false);
        assert.deepEqual(result1, { italic: true });

        // Test 2: Transform with conflicting attributes, priority false
        const attrs3 = { bold: true, color: 'red' };
        const attrs4 = { bold: false, italic: true };
        const result2 = quill_delta.AttributeMap.transform(attrs3, attrs4, false);
        assert.deepEqual(result2, { italic: true });

        // Test 3: Transform with conflicting attributes, priority true
        const attrs5 = { bold: true, color: 'red' };
        const attrs6 = { bold: false, italic: true };
        const result3 = quill_delta.AttributeMap.transform(attrs5, attrs6, true);
        assert.deepEqual(result3, { bold: false, italic: true });

        // Test 4: Transform with null/undefined attributes
        const attrs7 = { bold: true };
        const attrs8 = null;
        const result4 = quill_delta.AttributeMap.transform(attrs7, attrs8, false);
        assert.deepEqual(result4, {});

        // Test 5: Transform with empty attributes
        const attrs9 = {};
        const attrs10 = { italic: true };
        const result5 = quill_delta.AttributeMap.transform(attrs9, attrs10, false);
        assert.deepEqual(result5, { italic: true });

        // Test 6: Transform with same attributes
        const attrs11 = { bold: true, italic: true };
        const attrs12 = { bold: true, color: 'blue' };
        const result6 = quill_delta.AttributeMap.transform(attrs11, attrs12, false);
        assert.deepEqual(result6, { color: 'blue' });

        done();
    });
});