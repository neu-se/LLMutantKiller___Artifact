The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        
        // Test 1: Empty attributes
        let result1 = quill_delta.AttributeMap.invert({}, {});
        assert.deepEqual(result1, {}, 'Empty attributes should return empty object');
        
        // Test 2: Adding new attributes (should invert to null)
        let result2 = quill_delta.AttributeMap.invert({ bold: true, italic: true }, {});
        assert.deepEqual(result2, { bold: null, italic: null }, 'New attributes should be inverted to null');
        
        // Test 3: Removing attributes (should restore original values)
        let result3 = quill_delta.AttributeMap.invert({}, { bold: true, italic: true });
        assert.deepEqual(result3, { bold: true, italic: true }, 'Removed attributes should be restored');
        
        // Test 4: Changing attribute values
        let result4 = quill_delta.AttributeMap.invert({ bold: true, color: 'red' }, { bold: false, color: 'blue' });
        assert.deepEqual(result4, { bold: false, color: 'blue' }, 'Changed attributes should be reverted to original values');
        
        // Test 5: Mixed scenario - some added, some changed, some unchanged
        let attr = { bold: true, italic: true, color: 'red' };
        let base = { bold: false, color: 'red', underline: true };
        let result5 = quill_delta.AttributeMap.invert(attr, base);
        let expected5 = { 
            bold: false,      // changed from false to true, so invert back to false
            underline: true,  // was in base but removed in attr, so restore it
            italic: null      // was added in attr, so set to null to remove it
        };
        assert.deepEqual(result5, expected5, 'Mixed scenario should handle all cases correctly');
        
        // Test 6: Undefined attr parameter (should use default empty object)
        let result6 = quill_delta.AttributeMap.invert(undefined, { bold: true });
        assert.deepEqual(result6, { bold: true }, 'Undefined attr should be treated as empty object');
        
        // Test 7: Null attr parameter (should use default empty object)
        let result7 = quill_delta.AttributeMap.invert(null, { bold: true });
        assert.deepEqual(result7, { bold: true }, 'Null attr should be treated as empty object');
        
        // Test 8: Same attributes (no changes needed)
        let result8 = quill_delta.AttributeMap.invert({ bold: true, italic: false }, { bold: true, italic: false });
        assert.deepEqual(result8, {}, 'Identical attributes should return empty inversion');
        
        // Test 9: Complex attribute values
        let result9 = quill_delta.AttributeMap.invert(
            { font: 'Arial', size: 12, list: 'ordered' }, 
            { font: 'Times', size: 12, background: '#fff' }
        );
        let expected9 = {
            font: 'Times',        // changed value, restore original
            background: '#fff',   // removed from attr, restore it
            list: null           // added in attr, remove it
        };
        assert.deepEqual(result9, expected9, 'Complex attribute values should be handled correctly');
        
        done();
    });
});
``` 
failed with the following error message:
```
Removed attributes should be restored  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.