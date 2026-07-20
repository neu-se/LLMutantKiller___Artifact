let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose', function(done) {
        // Test 1: Basic composition with two attribute objects
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

        // Test 3: Composition with null values and keepNull = false (default)
        let result3 = quill_delta.AttributeMap.compose(
            { bold: true, italic: true },
            { bold: null, color: 'green' }
        );
        assert.deepEqual(result3, { color: 'green', italic: true });

        // Test 4: Composition with null values and keepNull = true
        let result4 = quill_delta.AttributeMap.compose(
            { bold: true, italic: true },
            { bold: null, color: 'green' },
            true
        );
        assert.deepEqual(result4, { bold: null, color: 'green', italic: true });

        // Test 5: Empty objects should return undefined
        let result5 = quill_delta.AttributeMap.compose({}, {});
        assert.equal(result5, undefined);

        // Test 6: Only a has attributes, b is empty
        let result6 = quill_delta.AttributeMap.compose(
            { bold: true, size: 14 },
            {}
        );
        assert.deepEqual(result6, { bold: true, size: 14 });

        // Test 7: Only b has attributes, a is empty
        let result7 = quill_delta.AttributeMap.compose(
            {},
            { color: 'purple', underline: true }
        );
        assert.deepEqual(result7, { color: 'purple', underline: true });

        // Test 8: Non-object inputs should be treated as empty objects
        let result8 = quill_delta.AttributeMap.compose(
            null,
            { bold: true }
        );
        assert.deepEqual(result8, { bold: true });

        // Test 9: Undefined values in a should be preserved when b doesn't have the key
        let result9 = quill_delta.AttributeMap.compose(
            { bold: true, italic: undefined, size: 12 },
            { color: 'red' }
        );
        assert.deepEqual(result9, { color: 'red', bold: true, size: 12 });

        // Test 10: All null values in b with keepNull = false should result in undefined
        let result10 = quill_delta.AttributeMap.compose(
            {},
            { bold: null, italic: null }
        );
        assert.equal(result10, undefined);

        done();
    });
});