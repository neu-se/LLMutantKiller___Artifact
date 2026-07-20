let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext - single operation', function(done) {
        let delta = new quill_delta([{ insert: 'Hello' }]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation initially');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), false, 'Should not have next operation after consuming the only one');
        done();
    });
});