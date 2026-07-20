let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform', function(done) {
        // Test 1: Transform with no conflicting attributes
        let a1 = { bold: true };
        let b1 = { italic: true };
        let result1 = quill_delta.AttributeMap.transform(a1, b1, false);
        assert.deepEqual(result1, { italic: true }, 'Should preserve non-conflicting attributes');

        // Test 2: Transform with conflicting attributes, priority false
        let a2 = { bold: true };
        let b2 = { bold: false };
        let result2 = quill_delta.AttributeMap.transform(a2, b2, false);
        assert.deepEqual(result2, {}, 'Should remove conflicting attributes when priority is false');

        // Test 3: Transform with conflicting attributes, priority true
        let a3 = { bold: true };
        let b3 = { bold: false };
        let result3 = quill_delta.AttributeMap.transform(a3, b3, true);
        assert.deepEqual(result3, { bold: false }, 'Should keep b\'s attributes when priority is true');

        // Test 4: Transform with mixed attributes
        let a4 = { bold: true, color: 'red' };
        let b4 = { bold: false, italic: true };
        let result4 = quill_delta.AttributeMap.transform(a4, b4, false);
        assert.deepEqual(result4, { italic: true }, 'Should handle mixed conflicting and non-conflicting attributes');

        // Test 5: Transform with empty attribute maps
        let a5 = {};
        let b5 = { bold: true };
        let result5 = quill_delta.AttributeMap.transform(a5, b5, false);
        assert.deepEqual(result5, { bold: true }, 'Should handle empty first attribute map');

        // Test 6: Transform with null/undefined values
        let a6 = { bold: true };
        let b6 = { bold: null };
        let result6 = quill_delta.AttributeMap.transform(a6, b6, false);
        assert.deepEqual(result6, {}, 'Should handle null values in attributes');

        // Test 7: Transform with priority true and multiple attributes
        let a7 = { bold: true, italic: false };
        let b7 = { bold: false, italic: true, underline: true };
        let result7 = quill_delta.AttributeMap.transform(a7, b7, true);
        assert.deepEqual(result7, { bold: false, italic: true, underline: true }, 'Should prioritize b\'s attributes when priority is true');

        done();
    });
});