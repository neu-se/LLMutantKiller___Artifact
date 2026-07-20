let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - empty objects', function(done) {
        const result = quill_delta.AttributeMap.diff({}, {});
        assert.strictEqual(result, undefined);
        done();
    });
});