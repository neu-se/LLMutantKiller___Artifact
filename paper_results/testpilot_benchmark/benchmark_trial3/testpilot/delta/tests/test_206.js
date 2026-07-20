let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff', function(done) {
        // Test 1: Empty objects should return undefined
        let result1 = quill_delta.AttributeMap.diff({}, {});
        assert.strictEqual(result1, undefined);

        // Test 2: Same objects should return undefined
        let result2 = quill_delta.AttributeMap.diff({bold: true, italic: false}, {bold: true, italic: false});
        assert.strictEqual(result2, undefined);

        // Test 3: Different values should return the differences
        let result3 = quill_delta.AttributeMap.diff({bold: true}, {bold: false});
        assert.deepStrictEqual(result3, {bold: false});

        // Test 4: Added attributes should be included
        let result4 = quill_delta.AttributeMap.diff({}, {bold: true, italic: false});
        assert.deepStrictEqual(result4, {bold: true, italic: false});

        // Test 5: Removed attributes should be set to null
        let result5 = quill_delta.AttributeMap.diff({bold: true, italic: false}, {});
        assert.deepStrictEqual(result5, {bold: null, italic: null});

        // Test 6: Mixed changes - some added, some removed, some modified
        let result6 = quill_delta.AttributeMap.diff(
            {bold: true, italic: false, color: 'red'}, 
            {bold: false, underline: true, color: 'red'}
        );
        assert.deepStrictEqual(result6, {bold: false, italic: null, underline: true});

        // Test 7: Non-object inputs should be treated as empty objects
        let result7 = quill_delta.AttributeMap.diff(null, {bold: true});
        assert.deepStrictEqual(result7, {bold: true});

        let result8 = quill_delta.AttributeMap.diff({bold: true}, "not an object");
        assert.deepStrictEqual(result8, {bold: null});

        // Test 8: Complex nested values
        let result9 = quill_delta.AttributeMap.diff(
            {style: {fontSize: 12}}, 
            {style: {fontSize: 14}}
        );
        assert.deepStrictEqual(result9, {style: {fontSize: 14}});

        done();
    });
});