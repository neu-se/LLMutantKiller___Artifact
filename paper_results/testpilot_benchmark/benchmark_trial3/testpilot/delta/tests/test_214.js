let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - identical objects', function(done) {
        const a = { bold: true, italic: false };
        const b = { bold: true, italic: false };
        const result = quill_delta.AttributeMap.diff(a, b);
        assert.strictEqual(result, undefined);
        done();
    });
});