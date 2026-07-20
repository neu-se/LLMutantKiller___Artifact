let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekLength', function(done) {
        // Test 1: Empty delta
        let emptyDelta = new quill_delta.Delta();
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.strictEqual(emptyIterator.peekLength(), Infinity);

        // Test 2: Single insert operation
        let singleOpDelta = new quill_delta.Delta().insert('hello');
        let singleOpIterator = new quill_delta.OpIterator(singleOpDelta.ops);
        assert.strictEqual(singleOpIterator.peekLength(), 5);

        // Test 3: Multiple operations
        let multiOpDelta = new quill_delta.Delta()
            .insert('hello')
            .insert(' world')
            .retain(3);
        let multiOpIterator = new quill_delta.OpIterator(multiOpDelta.ops);
        assert.strictEqual(multiOpIterator.peekLength(), 5); // First op length

        // Test 4: After consuming some operations
        multiOpIterator.next(3); // Consume 3 characters from first op
        assert.strictEqual(multiOpIterator.peekLength(), 2); // Remaining from first op

        multiOpIterator.next(2); // Consume remaining from first op
        assert.strictEqual(multiOpIterator.peekLength(), 6); // Second op length

        // Test 5: Delete operation
        let deleteOpDelta = new quill_delta.Delta().delete(10);
        let deleteOpIterator = new quill_delta.OpIterator(deleteOpDelta.ops);
        assert.strictEqual(deleteOpIterator.peekLength(), 10);

        // Test 6: Retain operation
        let retainOpDelta = new quill_delta.Delta().retain(7);
        let retainOpIterator = new quill_delta.OpIterator(retainOpDelta.ops);
        assert.strictEqual(retainOpIterator.peekLength(), 7);

        // Test 7: Mixed operations with embeds
        let embedDelta = new quill_delta.Delta()
            .insert({ image: 'url' })
            .insert('text');
        let embedIterator = new quill_delta.OpIterator(embedDelta.ops);
        assert.strictEqual(embedIterator.peekLength(), 1); // Embed has length 1

        done();
    });
});