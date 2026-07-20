let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext - with retain and delete operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'test' }
        ]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (retain)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (delete)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (insert)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), false, 'Should not have next operation after all consumed');
        done();
    });
});