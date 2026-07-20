let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test delete operation
        let deleteOps = [{ delete: 5 }];
        let deleteIterator = new quill_delta.OpIterator(deleteOps);
        assert.strictEqual(deleteIterator.peekType(), 'delete');

        // Test retain operation with number
        let retainOps = [{ retain: 3 }];
        let retainIterator = new quill_delta.OpIterator(retainOps);
        assert.strictEqual(retainIterator.peekType(), 'retain');

        // Test retain operation with object
        let retainObjectOps = [{ retain: { bold: true } }];
        let retainObjectIterator = new quill_delta.OpIterator(retainObjectOps);
        assert.strictEqual(retainObjectIterator.peekType(), 'retain');

        // Test insert operation with string
        let insertOps = [{ insert: 'hello' }];
        let insertIterator = new quill_delta.OpIterator(insertOps);
        assert.strictEqual(insertIterator.peekType(), 'insert');

        // Test insert operation with object (embed)
        let insertEmbedOps = [{ insert: { image: 'url' } }];
        let insertEmbedIterator = new quill_delta.OpIterator(insertEmbedOps);
        assert.strictEqual(insertEmbedIterator.peekType(), 'insert');

        // Test empty ops array (should return 'retain')
        let emptyOps = [];
        let emptyIterator = new quill_delta.OpIterator(emptyOps);
        assert.strictEqual(emptyIterator.peekType(), 'retain');

        // Test when iterator is at the end (should return 'retain')
        let singleOp = [{ insert: 'test' }];
        let endIterator = new quill_delta.OpIterator(singleOp);
        endIterator.next(); // Move past the only operation
        assert.strictEqual(endIterator.peekType(), 'retain');

        // Test retain with null object (should be 'insert' since retain !== null check fails)
        let retainNullOps = [{ retain: null }];
        let retainNullIterator = new quill_delta.OpIterator(retainNullOps);
        assert.strictEqual(retainNullIterator.peekType(), 'insert');

        done();
    });
});