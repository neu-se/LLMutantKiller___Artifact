let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - overriding values', function(done) {
        let a = { bold: true, color: 'red', size: '12px' };
        let b = { color: 'blue', italic: true };
        let result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { bold: true, color: 'blue', size: '12px', italic: true });
        done();
    });
});