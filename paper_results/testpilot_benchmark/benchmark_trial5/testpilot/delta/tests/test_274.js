let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with priority false', function(done) {
        let a = { bold: true, color: 'blue' };
        let b = { bold: false, color: 'red', italic: true };
        
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // With priority false, b's attributes should take precedence
        assert.deepEqual(result, { bold: false, color: 'red', italic: true });
        done();
    });
});