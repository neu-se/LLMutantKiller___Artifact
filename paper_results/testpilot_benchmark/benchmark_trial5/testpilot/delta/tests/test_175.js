let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose', function(done) {
        // Test 1: Basic composition with both objects having attributes
        let result1 = quill_delta.AttributeMap.compose(
            { bold: true, italic: false },
            { color: 'red', bold: false }
        );
        assert.deepEqual(result1, { color: 'red', bold: false, italic: false });

        // Test 2: Composition where b overrides a
        let result2 = quill_delta.AttributeMap.compose(
            { bold: true, size: 12 },
            { bold: false, color: 'blue' }
        );
        assert.deepEqual(result2, { bold: false, color: 'blue', size: 12 });

        // Test 3: Composition with null values (keepNull = false by default)
        let result3 = quill_delta.AttributeMap.compose(
            { bold: true, italic: true },
            { bold: null, color: 'green' }
        );
        assert.deepEqual(result3, { color: 'green', italic: true });

        // Test 4: Composition with null values (keepNull = true)
        let result4 = quill_delta.AttributeMap.compose(
            { bold: true, italic: true },
            { bold: null, color: 'green' },
            true
        );
        assert.deepEqual(result4, { bold: null, color: 'green', italic: true });

        // Test 5: Empty objects
        let result5 = quill_delta.AttributeMap.compose({}, {});
        assert.equal(result5, undefined);

        // Test 6: First object empty
        let result6 = quill_delta.AttributeMap.compose({}, { bold: true });
        assert.deepEqual(result6, { bold: true });

        // Test 7: Second object empty
        let result7 = quill_delta.AttributeMap.compose({ bold: true }, {});
        assert.deepEqual(result7, { bold: true });

        // Test 8: Non-object inputs (should be treated as empty objects)
        let result8 = quill_delta.AttributeMap.compose(null, { bold: true });
        assert.deepEqual(result8, { bold: true });

        let result9 = quill_delta.AttributeMap.compose({ bold: true }, null);
        assert.deepEqual(result9, { bold: true });

        // Test 9: Undefined values in first object are preserved
        let result10 = quill_delta.AttributeMap.compose(
            { bold: undefined, italic: true },
            { color: 'red' }
        );
        assert.deepEqual(result10, { color: 'red', italic: true });

        // Test 10: All null values with keepNull = false results in undefined
        let result11 = quill_delta.AttributeMap.compose(
            {},
            { bold: null, italic: null }
        );
        assert.equal(result11, undefined);

        done();
    });
});