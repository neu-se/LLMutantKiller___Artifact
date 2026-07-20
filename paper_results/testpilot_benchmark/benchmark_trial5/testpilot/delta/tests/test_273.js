let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with priority true', function(done) {
        let a = { bold: true, color: 'blue' };
        let b = { bold: false, color: 'red', italic: true };
        
        let result = quill_delta.AttributeMap.transform(a, b, true);
        
        // With priority true, a's attributes should take precedence for conflicts
        assert.deepEqual(result, { bold: true, color: 'blue', italic: true });
        done();
    });
});