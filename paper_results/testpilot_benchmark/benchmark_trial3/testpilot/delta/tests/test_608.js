let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - text replacement', function(done) {
        let delta1 = new Delta([{insert: 'Hello World'}]);
        let delta2 = new Delta([{insert: 'Hello Universe'}]);
        let diff = delta1.diff(delta2);
        assert.deepEqual(diff.ops, [{retain: 6}, {delete: 5}, {insert: 'Universe'}]);
        done();
    });
});