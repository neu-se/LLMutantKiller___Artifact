let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with empty attribute maps', function(done) {
        let a = {};
        let b = { bold: true };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        assert.deepEqual(result, { bold: true });
        done();
    });
});