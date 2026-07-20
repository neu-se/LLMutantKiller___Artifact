let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta from another delta object', function(done) {
        let ops = [{ insert: 'test' }];
        let originalDelta = new quill_delta(ops);
        let newDelta = new quill_delta(originalDelta);
        assert.deepEqual(newDelta.ops, ops);
        done();
    });
});