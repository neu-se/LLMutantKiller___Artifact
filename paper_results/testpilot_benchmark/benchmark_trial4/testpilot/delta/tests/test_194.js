let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - empty maps', function(done) {
        let result = quill_delta.AttributeMap.compose({}, {});
        assert.deepEqual(result, {});
        done();
    });
});