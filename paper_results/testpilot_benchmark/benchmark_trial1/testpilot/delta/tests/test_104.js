let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach', function(done) {
        // Test 1: forEach with empty delta
        let emptyDelta = new quill_delta();
        let callCount = 0;
        emptyDelta.forEach((op) => {
            callCount++;
        });
        assert.equal(callCount, 0, 'forEach should not call predicate for empty delta');

        // Test 2: forEach with single operation
        let singleOpDelta = new quill_delta([{ insert: 'Hello' }]);
        let operations = [];
        singleOpDelta.forEach((op) => {
            operations.push(op);
        });
        assert.equal(operations.length, 1, 'forEach should call predicate once for single operation');
        assert.deepEqual(operations[0], { insert: 'Hello' }, 'forEach should pass correct operation');

        // Test 3: forEach with multiple operations
        let multiOpDelta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } },
            { delete: 5 }
        ]);
        let collectedOps = [];
        multiOpDelta.forEach((op) => {
            collectedOps.push(op);
        });
        assert.equal(collectedOps.length, 4, 'forEach should call predicate for each operation');
        assert.deepEqual(collectedOps[0], { insert: 'Hello' });
        assert.deepEqual(collectedOps[1], { insert: ' ' });
        assert.deepEqual(collectedOps[2], { insert: 'World', attributes: { bold: true } });
        assert.deepEqual(collectedOps[3], { delete: 5 });

        // Test 4: forEach with index parameter
        let indexDelta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        let indices = [];
        indexDelta.forEach((op, index) => {
            indices.push(index);
        });
        assert.deepEqual(indices, [0, 1, 2], 'forEach should pass correct indices');

        // Test 5: forEach with array parameter
        let arrayDelta = new quill_delta([
            { insert: 'Test' },
            { retain: 3 }
        ]);
        let arrayRefs = [];
        arrayDelta.forEach((op, index, array) => {
            arrayRefs.push(array);
        });
        assert.equal(arrayRefs.length, 2, 'forEach should pass array parameter');
        assert.strictEqual(arrayRefs[0], arrayDelta.ops, 'forEach should pass reference to ops array');
        assert.strictEqual(arrayRefs[1], arrayDelta.ops, 'forEach should pass reference to ops array');

        done();
    });
});