let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest - empty iterator', function(done) {
        let delta = new quill_delta([]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        let rest = iterator.rest();
        assert.deepEqual(rest, []);
        done();
    });
});