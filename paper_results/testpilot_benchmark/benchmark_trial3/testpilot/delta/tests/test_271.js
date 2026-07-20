let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with basic attributes', function(done) {
        let a = { bold: true, italic: true };
        let b = { underline: true };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        assert.deepEqual(result, { bold: true, italic: true, underline: true });
        done();
    });
});