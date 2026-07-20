let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - basic composition', function(done) {
        const a = { bold: true, color: 'red' };
        const b = { italic: true, color: 'blue' };
        const result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { bold: true, italic: true, color: 'blue' });
        done();
    });
});