let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test peekType method', function(done) {
        const deleteOps = [{ delete: 5 }];
        const retainOps = [{ retain: 5 }];
        const insertOps = [{ insert: 'Hello' }];
        const emptyOps = [];
        
        assert.strictEqual(new quill_delta.OpIterator(deleteOps).peekType(), 'delete');
        assert.strictEqual(new quill_delta.OpIterator(retainOps).peekType(), 'retain');
        assert.strictEqual(new quill_delta.OpIterator(insertOps).peekType(), 'insert');
        assert.strictEqual(new quill_delta.OpIterator(emptyOps).peekType(), 'retain');
        done();
    });
});