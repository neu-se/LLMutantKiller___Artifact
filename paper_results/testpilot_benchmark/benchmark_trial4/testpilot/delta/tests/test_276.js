let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with null attributes', function(done) {
        let a = { bold: true, italic: null };
        let b = { italic: true, underline: true };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        assert.deepEqual(result, { bold: true, underline: true });
        done();
    });
});