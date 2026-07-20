let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform', function(done) {
        const AttributeMap = quill_delta.AttributeMap;
        
        // Test 1: When 'a' is not an object, return 'b'
        let result1 = AttributeMap.transform(null, { bold: true });
        assert.deepEqual(result1, { bold: true });
        
        let result2 = AttributeMap.transform('string', { italic: true });
        assert.deepEqual(result2, { italic: true });
        
        let result3 = AttributeMap.transform(123, { underline: true });
        assert.deepEqual(result3, { underline: true });
        
        // Test 2: When 'b' is not an object, return undefined
        let result4 = AttributeMap.transform({ bold: true }, null);
        assert.equal(result4, undefined);
        
        let result5 = AttributeMap.transform({ bold: true }, 'string');
        assert.equal(result5, undefined);
        
        let result6 = AttributeMap.transform({ bold: true }, 123);
        assert.equal(result6, undefined);
        
        // Test 3: When priority is false (default), return 'b'
        let result7 = AttributeMap.transform({ bold: true }, { italic: true });
        assert.deepEqual(result7, { italic: true });
        
        let result8 = AttributeMap.transform({ bold: true }, { italic: true }, false);
        assert.deepEqual(result8, { italic: true });
        
        // Test 4: When priority is true, only include attributes from 'b' that are not in 'a'
        let result9 = AttributeMap.transform({ bold: true }, { italic: true }, true);
        assert.deepEqual(result9, { italic: true });
        
        // Test 5: When priority is true and 'b' has attributes that exist in 'a', exclude them
        let result10 = AttributeMap.transform({ bold: true }, { bold: false, italic: true }, true);
        assert.deepEqual(result10, { italic: true });
        
        // Test 6: When priority is true and all attributes in 'b' exist in 'a', return undefined
        let result11 = AttributeMap.transform({ bold: true, italic: true }, { bold: false, italic: false }, true);
        assert.equal(result11, undefined);
        
        // Test 7: When priority is true and 'b' is empty, return undefined
        let result12 = AttributeMap.transform({ bold: true }, {}, true);
        assert.equal(result12, undefined);
        
        // Test 8: When priority is true and 'a' is empty, return 'b'
        let result13 = AttributeMap.transform({}, { bold: true, italic: true }, true);
        assert.deepEqual(result13, { bold: true, italic: true });
        
        // Test 9: Test with null values (null is a valid value according to comment)
        let result14 = AttributeMap.transform({ bold: true }, { italic: null }, true);
        assert.deepEqual(result14, { italic: null });
        
        // Test 10: Mixed scenario with priority true
        let result15 = AttributeMap.transform(
            { bold: true, color: 'red' }, 
            { bold: false, italic: true, underline: null, color: 'blue' }, 
            true
        );
        assert.deepEqual(result15, { italic: true, underline: null });
        
        done();
    });
});