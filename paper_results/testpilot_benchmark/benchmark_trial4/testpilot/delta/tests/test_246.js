let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        // Test 1: Empty attributes
        let result1 = quill_delta.AttributeMap.invert({}, {});
        assert.deepEqual(result1, {}, 'Empty attributes should return empty object');

        // Test 2: Adding new attributes (should be nullified in invert)
        let result2 = quill_delta.AttributeMap.invert({ bold: true, italic: true }, {});
        assert.deepEqual(result2, { bold: null, italic: null }, 'New attributes should be nullified');

        // Test 3: Removing attributes (should be restored in invert)
        let result3 = quill_delta.AttributeMap.invert({}, { bold: true, italic: true });
        assert.deepEqual(result3, { bold: true, italic: true }, 'Removed attributes should be restored');

        // Test 4: Changing attribute values
        let result4 = quill_delta.AttributeMap.invert({ color: 'red' }, { color: 'blue' });
        assert.deepEqual(result4, { color: 'blue' }, 'Changed attributes should be reverted to original value');

        // Test 5: Mixed scenario - some added, some changed, some unchanged
        let attr = { bold: true, color: 'red', size: '12px' };
        let base = { color: 'blue', italic: true };
        let result5 = quill_delta.AttributeMap.invert(attr, base);
        let expected5 = { 
            color: 'blue',  // reverted to base value
            italic: true,   // restored from base
            bold: null,     // new attribute nullified
            size: null      // new attribute nullified
        };
        assert.deepEqual(result5, expected5, 'Mixed scenario should handle all cases correctly');

        // Test 6: Same attributes (no changes needed)
        let result6 = quill_delta.AttributeMap.invert({ bold: true }, { bold: true });
        assert.deepEqual(result6, {}, 'Identical attributes should return empty object');

        // Test 7: Undefined/null handling
        let result7 = quill_delta.AttributeMap.invert({ bold: undefined }, { bold: true });
        assert.deepEqual(result7, {}, 'Undefined attributes should be ignored');

        // Test 8: Complex mixed case
        let attr8 = { bold: true, italic: false, color: 'red', underline: true };
        let base8 = { bold: false, italic: false, color: 'blue', strike: true };
        let result8 = quill_delta.AttributeMap.invert(attr8, base8);
        let expected8 = {
            bold: false,      // reverted to base value
            color: 'blue',    // reverted to base value
            strike: true,     // restored from base
            underline: null   // new attribute nullified
        };
        assert.deepEqual(result8, expected8, 'Complex case should handle all attribute changes');

        done();
    });
});