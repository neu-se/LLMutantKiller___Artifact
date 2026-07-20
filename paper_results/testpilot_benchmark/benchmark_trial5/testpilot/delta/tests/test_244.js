let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - null/undefined parameters', function(done) {
        const result1 = quill_delta.AttributeMap.invert(null, { bold: true });
        const expected1 = {};
        assert.deepEqual(result1, expected1);

        const result2 = quill_delta.AttributeMap.invert({ bold: true }, null);
        const expected2 = { bold: null };
        assert.deepEqual(result2, expected2);

        const result3 = quill_delta.AttributeMap.invert();
        const expected3 = {};
        assert.deepEqual(result3, expected3);
        done();
    });
});