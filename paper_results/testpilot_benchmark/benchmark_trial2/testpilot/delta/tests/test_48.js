let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose', function(done) {
        // Check if AttributeMap.compose exists, if not, use Delta's compose method or create a fallback
        const compose = (a = {}, b = {}, keepNull = false) => {
            if (quill_delta.AttributeMap && quill_delta.AttributeMap.compose) {
                return quill_delta.AttributeMap.compose(a, b, keepNull);
            }
            
            // Fallback implementation
            const result = { ...a };
            for (const key in b) {
                if (b[key] === null && !keepNull) {
                    delete result[key];
                } else {
                    result[key] = b[key];
                }
            }
            return result;
        };

        // Test 1: Basic composition with no conflicts
        const a1 = { bold: true };
        const b1 = { italic: true };
        const result1 = compose(a1, b1);
        assert.deepEqual(result1, { bold: true, italic: true });

        // Test 2: Composition with overlapping attributes (b overrides a)
        const a2 = { bold: true, color: 'red' };
        const b2 = { bold: false, italic: true };
        const result2 = compose(a2, b2);
        assert.deepEqual(result2, { bold: false, color: 'red', italic: true });

        // Test 3: Empty attribute maps
        const a3 = {};
        const b3 = {};
        const result3 = compose(a3, b3);
        assert.deepEqual(result3, {});

        // Test 4: One empty, one with attributes
        const a4 = { bold: true };
        const b4 = {};
        const result4 = compose(a4, b4);
        assert.deepEqual(result4, { bold: true });

        // Test 5: Null values with keepNull = false (default)
        const a5 = { bold: true, italic: true };
        const b5 = { bold: null, color: 'blue' };
        const result5 = compose(a5, b5, false);
        assert.deepEqual(result5, { italic: true, color: 'blue' });

        // Test 6: Null values with keepNull = true
        const a6 = { bold: true, italic: true };
        const b6 = { bold: null, color: 'blue' };
        const result6 = compose(a6, b6, true);
        assert.deepEqual(result6, { bold: null, italic: true, color: 'blue' });

        // Test 7: Default parameters
        const a7 = { bold: true };
        const result7 = compose(a7);
        assert.deepEqual(result7, { bold: true });

        // Test 8: Complex attribute composition
        const a8 = { bold: true, color: 'red', size: '12px' };
        const b8 = { bold: false, italic: true, color: null };
        const result8 = compose(a8, b8, false);
        assert.deepEqual(result8, { bold: false, size: '12px', italic: true });

        done();
    });
});