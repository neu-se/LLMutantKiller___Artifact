let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - null values without keepNull', function(done) {
        const a = { bold: true, italic: false };
        const b = { color: null, underline: true };
        const result = quill_delta.AttributeMap.compose(a, b, false);
        
        assert.deepEqual(result, { bold: true, italic: false, underline: true });
        done();
    });
});