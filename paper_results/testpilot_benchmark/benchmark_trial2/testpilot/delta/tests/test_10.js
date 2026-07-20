let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext', function(done) {
        // Test 1: OpIterator with operations should have next
        let delta1 = new Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iterator1 = new Delta.OpIterator(delta1.ops);
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator with operations should have next');

        // Test 2: After consuming some operations, should still have next if more remain
        iterator1.next(3); // consume 3 characters from "Hello"
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator should still have next after partial consumption');

        // Test 3: After consuming all operations, should not have next
        iterator1.next(); // consume remaining "lo"
        iterator1.next(); // consume " World"
        assert.strictEqual(iterator1.hasNext(), false, 'Iterator should not have next after consuming all operations');

        // Test 4: Empty OpIterator should not have next
        let emptyDelta = new Delta([]);
        let emptyIterator = new Delta.OpIterator(emptyDelta.ops);
        assert.strictEqual(emptyIterator.hasNext(), false, 'Empty iterator should not have next');

        // Test 5: OpIterator with single operation
        let singleOpDelta = new Delta([{ insert: 'A' }]);
        let singleOpIterator = new Delta.OpIterator(singleOpDelta.ops);
        assert.strictEqual(singleOpIterator.hasNext(), true, 'Single operation iterator should have next initially');
        singleOpIterator.next();
        assert.strictEqual(singleOpIterator.hasNext(), false, 'Single operation iterator should not have next after consumption');

        // Test 6: OpIterator with retain and delete operations
        let mixedDelta = new Delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'test' }
        ]);
        let mixedIterator = new Delta.OpIterator(mixedDelta.ops);
        assert.strictEqual(mixedIterator.hasNext(), true, 'Mixed operations iterator should have next');

        done();
    });
});