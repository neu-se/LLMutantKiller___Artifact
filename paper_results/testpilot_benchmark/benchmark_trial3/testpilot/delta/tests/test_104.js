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

        // Test 2: After consuming some operations, should still have next
        iterator1.next(3); // consume 3 characters from "Hello"
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator should still have next after partial consumption');

        // Test 3: After consuming all operations, should not have next
        iterator1.next(); // consume remaining "lo"
        iterator1.next(); // consume " World"
        assert.strictEqual(iterator1.hasNext(), false, 'Iterator should not have next after consuming all operations');

        // Test 4: Empty OpIterator should not have next
        let delta2 = new quill_delta.Delta([]);
        let iterator2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iterator2.hasNext(), false, 'Empty iterator should not have next');

        // Test 5: OpIterator with single operation
        let delta3 = new quill_delta.Delta([{ insert: 'Test' }]);
        let iterator3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iterator3.hasNext(), true, 'Iterator with single operation should have next');
        iterator3.next(); // consume the operation
        assert.strictEqual(iterator3.hasNext(), false, 'Iterator should not have next after consuming single operation');

        done();
    });
});