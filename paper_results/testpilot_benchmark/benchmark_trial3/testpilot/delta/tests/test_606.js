let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with cursor parameter', function(done) {
        let delta1 = new Delta([{insert: 'Hello World'}]);
        let delta2 = new Delta([{insert: 'Hello Beautiful World'}]);
        let cursor = 6; // position after "Hello "
        let diff = delta1.diff(delta2, cursor);
        assert.deepEqual(diff.ops, [{retain: 6}, {insert: 'Beautiful '}]);
        done();
    });
});