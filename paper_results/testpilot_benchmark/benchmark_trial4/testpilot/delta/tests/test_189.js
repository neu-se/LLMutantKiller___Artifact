let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - overriding values', function(done) {
        let a = { color: 'red', size: '12px', bold: true };
        let b = { color: 'blue', italic: true };
        let result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { color: 'blue', size: '12px', bold: true, italic: true });
        done();
    });
});