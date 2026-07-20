let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach', function(done) {
        // Test 1: forEach with empty delta
        let emptyDelta = new quill_delta();
        let emptyCallCount = 0;
        emptyDelta.forEach((op) => {
            emptyCallCount++;
        });
        assert.equal(emptyCallCount, 0, 'forEach should not call predicate for empty delta');

        // Test 2: forEach with single operation
        let singleOpDelta = new quill_delta([{ insert: 'Hello' }]);
        let singleOpResults = [];
        singleOpDelta.forEach((op) => {
            singleOpResults.push(op);
        });
        assert.equal(singleOpResults.length, 1, 'forEach should call predicate once for single operation');
        assert.deepEqual(singleOpResults[0], { insert: 'Hello' }, 'forEach should pass correct operation to predicate');

        // Test 3: forEach with multiple operations
        let multiOpDelta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } },
            { delete: 5 }
        ]);
        let multiOpResults = [];
        multiOpDelta.forEach((op) => {
            multiOpResults.push(op);
        });
        assert.equal(multiOpResults.length, 3, 'forEach should call predicate for each operation');
        assert.deepEqual(multiOpResults[0], { insert: 'Hello' }, 'First operation should match');
        assert.deepEqual(multiOpResults[1], { insert: ' World', attributes: { bold: true } }, 'Second operation should match');
        assert.deepEqual(multiOpResults[2], { delete: 5 }, 'Third operation should match');

        // Test 4: forEach with index and array parameters
        let indexTestDelta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' }
        ]);
        let indexResults = [];
        indexTestDelta.forEach((op, index, array) => {
            indexResults.push({ op, index, arrayLength: array.length });
        });
        assert.equal(indexResults.length, 2, 'forEach should provide index and array parameters');
        assert.equal(indexResults[0].index, 0, 'First call should have index 0');
        assert.equal(indexResults[1].index, 1, 'Second call should have index 1');
        assert.equal(indexResults[0].arrayLength, 2, 'Array length should be correct');

        done();
    });
});