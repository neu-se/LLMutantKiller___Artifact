let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create empty delta when no ops provided', function(done) {
        let delta = new Delta();
        assert.deepEqual(delta.ops, []);
        done();
    });
});