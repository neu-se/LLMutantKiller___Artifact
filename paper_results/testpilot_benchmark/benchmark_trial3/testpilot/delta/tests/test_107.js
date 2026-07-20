let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext - multiple operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (1st)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (2nd)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), true, 'Should have next operation (3rd)');
        iterator.next();
        assert.strictEqual(iterator.hasNext(), false, 'Should not have next operation after consuming all');
        done();
    });
});