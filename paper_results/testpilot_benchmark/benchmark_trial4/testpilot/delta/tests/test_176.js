let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - only a provided', function(done) {
        const a = { bold: true, italic: false };
        const result = quill_delta.AttributeMap.compose(a);
        
        assert.deepEqual(result, { bold: true, italic: false });
        done();
    });
});