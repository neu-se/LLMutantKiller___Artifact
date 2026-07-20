let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff', function(done) {
        // Test 1: Empty attribute maps
        let diff1 = quill_delta.AttributeMap.diff({}, {});
        assert.deepEqual(diff1, undefined, 'Diff of empty maps should be undefined');

        // Test 2: Adding attributes
        let diff2 = quill_delta.AttributeMap.diff({}, { bold: true, italic: true });
        assert.deepEqual(diff2, { bold: true, italic: true }, 'Should return new attributes when adding to empty map');

        // Test 3: Removing attributes
        let diff3 = quill_delta.AttributeMap.diff({ bold: true, italic: true }, {});
        assert.deepEqual(diff3, { bold: null, italic: null }, 'Should return null values when removing attributes');

        // Test 4: Modifying attributes
        let diff4 = quill_delta.AttributeMap.diff({ color: 'red', size: '12px' }, { color: 'blue', size: '12px' });
        assert.deepEqual(diff4, { color: 'blue' }, 'Should only return changed attributes');

        // Test 5: Mixed changes (add, remove, modify)
        let diff5 = quill_delta.AttributeMap.diff(
            { bold: true, color: 'red', underline: true },
            { bold: true, color: 'blue', italic: true }
        );
        assert.deepEqual(diff5, { color: 'blue', underline: null, italic: true }, 'Should handle mixed attribute changes');

        // Test 6: No changes
        let diff6 = quill_delta.AttributeMap.diff({ bold: true, italic: true }, { bold: true, italic: true });
        assert.deepEqual(diff6, undefined, 'Should return undefined when no changes');

        // Test 7: Null and undefined values
        let diff7 = quill_delta.AttributeMap.diff({ bold: true }, { bold: null });
        assert.deepEqual(diff7, { bold: null }, 'Should handle null values correctly');

        done();
    });
});