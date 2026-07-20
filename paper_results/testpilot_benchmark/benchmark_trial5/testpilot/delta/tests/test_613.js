let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - empty to non-empty', function(done) {
        let delta1 = new Delta();
        let delta2 = new Delta([{insert: 'Hello'}]);
        let diff = delta1.diff(delta2);
        assert.deepEqual(diff.ops, [{insert: 'Hello'}]);
        done();
    });
});