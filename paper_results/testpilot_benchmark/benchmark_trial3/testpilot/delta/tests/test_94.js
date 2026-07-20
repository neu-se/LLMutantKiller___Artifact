let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator constructor', function(done) {
        const ops = [
            { insert: 'Hello' },
            { retain: 5 },
            { delete: 3 }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        assert.strictEqual(iterator.ops, ops);
        assert.strictEqual(iterator.index, 0);
        assert.strictEqual(iterator.offset, 0);
        done();
    });
});