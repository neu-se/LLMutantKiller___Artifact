let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - null/undefined handling', function(done) {
        const attr = null;
        const base = { bold: true };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = {};
        assert.deepEqual(result, expected);
        done();
    });
});