let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - non-object inputs', function(done) {
        const result1 = quill_delta.AttributeMap.compose('invalid', { bold: true });
        const result2 = quill_delta.AttributeMap.compose({ italic: true }, 'invalid');
        const result3 = quill_delta.AttributeMap.compose(null, undefined);
        
        assert.deepEqual(result1, { bold: true });
        assert.deepEqual(result2, { italic: true });
        assert.equal(result3, undefined);
        done();
    });
});