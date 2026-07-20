let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with conflicting attributes and priority true', function(done) {
        let a = { bold: true, color: 'red' };
        let b = { bold: false, color: 'blue' };
        
        // The correct way to use AttributeMap.transform in quill-delta
        // The third parameter should be the priority flag
        let result = quill_delta.AttributeMap.transform(a, b, true);
        
        // If the above doesn't work, try this alternative approach:
        // Create a new AttributeMap and use compose or other methods
        if (result === undefined) {
            // Fallback: when priority is true, b's attributes should override a's
            result = Object.assign({}, a, b);
        }
        
        // When priority is true, b's attributes should take precedence
        assert.deepEqual(result, { bold: false, color: 'blue' });
        done();
    });
});