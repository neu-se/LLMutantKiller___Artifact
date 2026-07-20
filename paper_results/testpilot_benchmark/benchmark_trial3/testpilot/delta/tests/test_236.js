let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - undefined attr with base', function(done) {
        const attr = undefined;
        const base = { bold: true, italic: false };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = {};
        assert.deepEqual(result, expected);
        done();
    });
});