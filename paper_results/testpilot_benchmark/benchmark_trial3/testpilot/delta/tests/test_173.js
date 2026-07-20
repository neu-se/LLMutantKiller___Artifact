let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - b overrides a', function(done) {
        const a = { bold: true, color: 'red', size: 12 };
        const b = { bold: false, color: 'blue' };
        const result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { bold: false, color: 'blue', size: 12 });
        done();
    });
});