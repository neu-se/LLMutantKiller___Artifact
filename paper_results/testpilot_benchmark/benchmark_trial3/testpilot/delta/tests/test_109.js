let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext - empty delta', function(done) {
        let delta = new quill_delta();
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        assert.strictEqual(iterator.hasNext(), false, 'Empty delta should not have next operation');
        done();
    });
});