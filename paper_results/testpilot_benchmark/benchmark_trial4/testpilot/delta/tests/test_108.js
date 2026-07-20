let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext - after peek operations', function(done) {
        let delta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' }
        ]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation initially');
        iterator.peek(); // peek should not affect hasNext
        assert.strictEqual(iterator.hasNext(), true, 'Should still have next operation after peek');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (2nd)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), false, 'Should not have next operation after consuming all');
        done();
    });
});