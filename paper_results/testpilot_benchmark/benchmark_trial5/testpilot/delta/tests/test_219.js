let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - default parameters', function(done) {
        let result = quill_delta.AttributeMap.diff();
        assert.deepEqual(result, {});
        done();
    });
});