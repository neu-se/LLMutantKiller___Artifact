let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test delete operation
        let deleteOps = [{ delete: 5 }];
        let deleteIterator = new quill_delta.OpIterator(deleteOps);
        assert.equal(deleteIterator.peekType(), 'delete');

        // Test retain operation with number
        let retainOps = [{ retain: 3 }];
        let retainIterator = new quill_delta.OpIterator(retainOps);
        assert.equal(retainIterator.peekType(), 'retain');

        // Test retain operation with object
        let retainObjectOps = [{ retain: { bold: true } }];
        let retainObjectIterator = new quill_delta.OpIterator(retainObjectOps);
        assert.equal(retainObjectIterator.peekType(), 'retain');

        // Test insert operation (string)
        let insertOps = [{ insert: 'hello' }];
        let insertIterator = new quill_delta.OpIterator(insertOps);
        assert.equal(insertIterator.peekType(), 'insert');

        // Test insert operation (object like embed)
        let insertEmbedOps = [{ insert: { image: 'url' } }];
        let insertEmbedIterator = new quill_delta.OpIterator(insertEmbedOps);
        assert.equal(insertEmbedIterator.peekType(), 'insert');

        // Test empty ops array (should return 'retain')
        let emptyOps = [];
        let emptyIterator = new quill_delta.OpIterator(emptyOps);
        assert.equal(emptyIterator.peekType(), 'retain');

        // Test when iterator is at the end (should return 'retain')
        let singleOp = [{ insert: 'test' }];
        let endIterator = new quill_delta.OpIterator(singleOp);
        endIterator.next(); // Move past the only operation
        assert.equal(endIterator.peekType(), 'retain');

        // Test retain with null (should be 'insert' since retain must be number or non-null object)
        let retainNullOps = [{ retain: null }];
        let retainNullIterator = new quill_delta.OpIterator(retainNullOps);
        assert.equal(retainNullIterator.peekType(), 'insert');

        done();
    });
});