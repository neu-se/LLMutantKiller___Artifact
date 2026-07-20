let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext', function(done) {
        // Test 1: OpIterator with operations should have next
        let delta1 = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iterator1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator with operations should have next');

        // Test 2: After consuming all operations, should not have next
        iterator1.next(); // consume first op
        iterator1.next(); // consume second op
        assert.strictEqual(iterator1.hasNext(), false, 'Iterator after consuming all ops should not have next');

        // Test 3: Empty OpIterator should not have next
        let emptyDelta = new quill_delta.Delta([]);
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.strictEqual(emptyIterator.hasNext(), false, 'Empty iterator should not have next');

        // Test 4: OpIterator with single operation
        let singleOpDelta = new quill_delta.Delta([{ insert: 'Test' }]);
        let singleIterator = new quill_delta.OpIterator(singleOpDelta.ops);
        assert.strictEqual(singleIterator.hasNext(), true, 'Single operation iterator should have next');
        singleIterator.next();
        assert.strictEqual(singleIterator.hasNext(), false, 'Single operation iterator after consumption should not have next');

        // Test 5: OpIterator with retain and delete operations
        let mixedDelta = new quill_delta.Delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'New text' }
        ]);
        let mixedIterator = new quill_delta.OpIterator(mixedDelta.ops);
        assert.strictEqual(mixedIterator.hasNext(), true, 'Mixed operations iterator should have next');
        
        // Consume operations one by one and check hasNext
        mixedIterator.next(); // retain
        assert.strictEqual(mixedIterator.hasNext(), true, 'Should still have next after first operation');
        mixedIterator.next(); // delete
        assert.strictEqual(mixedIterator.hasNext(), true, 'Should still have next after second operation');
        mixedIterator.next(); // insert
        assert.strictEqual(mixedIterator.hasNext(), false, 'Should not have next after all operations consumed');

        done();
    });
});