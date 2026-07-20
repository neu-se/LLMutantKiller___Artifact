let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - empty objects', function(done) {
        const attr = {};
        const base = {};
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = {};
        assert.deepEqual(result, expected);
        done();
    });
});