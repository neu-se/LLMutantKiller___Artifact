let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - only a has attributes', function(done) {
        const a = { bold: true, italic: true };
        const b = {};
        const result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { bold: true, italic: true });
        done();
    });
});